from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import *
from .models import *
from .tokens import account_activation_token
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework import status
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.http import HttpResponse, JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json

def send_activation_email(user):
    token = account_activation_token.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    activation_link = f"http://127.0.0.1:8000/activate/{uid}/{token}/"

    subject = "Activate Your Account"
    message = f"Click the link to activate your Ezcommerce account: {activation_link}"

    send_mail(
        subject=subject,
        message=message,
        from_email="no-reply@ezcommerce.com",
        recipient_list=[user.email],
    )

class ActivateAccountView(View):
    def get(self, request, uidb64, token, *args, **kwargs):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = Usuario.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, Usuario.DoesNotExist):
            user = None

        if user is not None and account_activation_token.check_token(user, token):
            user.usuario_verificado = True
            user.save()
            return JsonResponse({'detail': 'Account activated successfully'}, status=status.HTTP_200_OK)
        else:
            return JsonResponse({'detail': 'Activation link is invalid!'}, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_exempt, name='dispatch')
class ResendActivationEmailView(View):
    def post(self, request, *args, **kwargs):
        if request.content_type == 'application/json':
            try:
                data = json.loads(request.body)
                email = data.get('email')
            except json.JSONDecodeError:
                return JsonResponse({'detail': 'Invalid JSON'}, status=400)
        else:
            email = request.POST.get('email')

        print(f"Email received: {email}") 
        try:
            user = Usuario.objects.get(email=email)
            if not user.usuario_verificado:
                send_activation_email(user)
                return JsonResponse({'detail': 'Activation email resent successfully'}, status=200)
            else:
                return JsonResponse({'detail': 'Account is already activated'}, status=400)
        except Usuario.DoesNotExist:
            return JsonResponse({'detail': 'User with this email does not exist'}, status=404)
        
class UsuarioViewSet(viewsets.ModelViewSet):
    """
    API Endpoint para CRUD de Usuario.
    """
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    
    def get_permissions(self):
        permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = Usuario.objects.get(pk=response.data['id'])
        send_activation_email(user)
        return response

class GroupViewSet(viewsets.ModelViewSet):
    """
    API Endpoint para CRUD de Group.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    def get_permissions(self):
        """
        Asigna permisos dependiendo del método HTTP.
        """
        if self.action == 'list' or self.action == 'retrieve':  # Para GET (ver)
            permission_classes = [permissions.AllowAny]  # Permite a cualquiera ver los datos
        else:  # Para POST, PUT, PATCH, DELETE (editar o agregar)
            permission_classes = [permissions.IsAuthenticated]  # Solo los autenticados pueden modificar

        return [permission() for permission in permission_classes]

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        # Use the default behavior to validate credentials and generate tokens
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_401_UNAUTHORIZED)
        
        # Generate tokens
        access_token = serializer.validated_data["access"]
        refresh_token = serializer.validated_data["refresh"]

        # Create the response
        response = Response({"access": access_token}, status=status.HTTP_200_OK)

        # Set the refresh token in a secure, HttpOnly cookie
        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,    # Prevent access via JavaScript
            secure=True,      # Use HTTPS only
            samesite="Strict" # Prevent CSRF attacks
        )

        return response
    
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        # Retrieve the refresh token from the cookie
        refresh_token = request.COOKIES.get("refresh_token")
        if not refresh_token:
            return Response({"detail": "Refresh token missing"}, status=status.HTTP_400_BAD_REQUEST)

        # Make a mutable copy of request.data
        mutable_data = request.data.copy()
        mutable_data["refresh"] = refresh_token

        # Use the modified data
        request._full_data = mutable_data  # Update the private `_full_data` attribute
        
        try:
            return super().post(request, *args, **kwargs)
        except InvalidToken:
            return Response({"detail": "Invalid refresh token"}, status=status.HTTP_401_UNAUTHORIZED)