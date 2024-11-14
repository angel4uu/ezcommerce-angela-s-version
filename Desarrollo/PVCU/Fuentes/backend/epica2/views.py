from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import *
from .models import *
from rest_framework.permissions import AllowAny

class FacultadViewSet(viewsets.ModelViewSet):
    """
    API Endpoint para CRUD de Facultad.
    """
    queryset = Facultad.objects.all()
    serializer_class = FacultadSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = '__all__'

class EscuelaProfesionalViewSet(viewsets.ModelViewSet):
    """
    API Endpoint para CRUD de EscuelaProfesional.
    """
    queryset = EscuelaProfesional.objects.all()
    serializer_class = EscuelaProfesionalSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = '__all__'