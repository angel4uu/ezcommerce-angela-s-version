from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import *
from .models import *
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework import status

class UsuarioViewSet(viewsets.ModelViewSet):
    """
    API Endpoint para CRUD de Usuario.
    """
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    
    def get_permissions(self):
        permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]

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