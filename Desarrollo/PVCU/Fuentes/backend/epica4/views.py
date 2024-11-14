from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import *
from .models import *
from rest_framework.permissions import AllowAny
from django.db.models import Q
from django.http import JsonResponse
from django.http import HttpResponse

class EtiquetaViewSet(viewsets.ModelViewSet):
    """
    API Endpoint para CRUD de Etiqueta.
    """
    queryset = Etiqueta.objects.all()
    serializer_class = EtiquetaSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = '__all__'


class CatalogoViewSet(viewsets.ModelViewSet):
    """
    API Endpoint para CRUD de Catalogo.
    """
    queryset = Catalogo.objects.all()
    serializer_class = CatalogoSerializer
    permission_classes = [permissions.IsAuthenticated]
    #filterset_fields = ['nombre'] # Nuevo API filter
    filterset_fields = '__all__'


class ArticuloViewSet(viewsets.ModelViewSet):
    """
    API Endpoint para CRUD de Articulo.
    """
    queryset = Articulo.objects.all()
    serializer_class = ArticuloSerializer
    permission_classes = [permissions.IsAuthenticated]
    #filterset_fields = ['nombre'] # Nuevo API filter
    filterset_fields = '__all__'


class ImagenViewSet(viewsets.ModelViewSet):
    """
    API Endpoint para CRUD de Imagen.
    """
    queryset = Imagen.objects.all()
    serializer_class = ImagenSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = '__all__'


################################################  Intento de Filtro 

