from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import *
from .models import *
from rest_framework.permissions import AllowAny

class MarcaViewSet(viewsets.ModelViewSet):
    """
    API Endpoint para CRUD de Marca.
    """
    queryset = Marca.objects.all()
    serializer_class = MarcaSerializer
    permission_classes = [permissions.IsAuthenticated]

class PlanViewSet(viewsets.ModelViewSet):
    """
    API Endpoint para CRUD de Plan.
    """
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
    permission_classes = [permissions.IsAuthenticated]

class MembresiaViewSet(viewsets.ModelViewSet):
    """
    API Endpoint para CRUD de Membresia.
    """
    queryset = Membresia.objects.all()
    serializer_class = MembresiaSerializer
    permission_classes = [permissions.IsAuthenticated]