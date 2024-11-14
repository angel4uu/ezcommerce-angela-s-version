from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from epica1.models import User
from epica1.serializers import UserSerializer

# Create your views here.


class UserUpdateView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user



class UserDeleteView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def delete(self, request, *args, **kwargs):
        user = self.get_object()
        self.perform_destroy(user)
        return Response({"detail": "Cuenta eliminada exitosamente."}, status=status.HTTP_204_NO_CONTENT)
