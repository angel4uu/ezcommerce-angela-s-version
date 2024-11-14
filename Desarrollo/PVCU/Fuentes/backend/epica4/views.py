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
    filterset_fields = '__all__'

    def get_permissions(self):
        """
        Asigna permisos dependiendo del método HTTP.
        """
        if self.action == 'list' or self.action == 'retrieve':  # Para GET (ver)
            permission_classes = [permissions.AllowAny]  # Permite a cualquiera ver los datos
        else:  # Para POST, PUT, PATCH, DELETE (editar o agregar)
            permission_classes = [permissions.IsAuthenticated]  # Solo los autenticados pueden modificar

        return [permission() for permission in permission_classes]


class CatalogoViewSet(viewsets.ModelViewSet):
    """
    API Endpoint para CRUD de Catalogo.
    """
    queryset = Catalogo.objects.all()
    serializer_class = CatalogoSerializer
    filterset_fields = '__all__'

    def get_permissions(self):
        """
        Asigna permisos dependiendo del método HTTP.
        """
        if self.action == 'list' or self.action == 'retrieve':  # Para GET (ver)
            permission_classes = [permissions.AllowAny]  # Permite a cualquiera ver los datos
        else:  # Para POST, PUT, PATCH, DELETE (editar o agregar)
            permission_classes = [permissions.IsAuthenticated]  # Solo los autenticados pueden modificar

        return [permission() for permission in permission_classes]


class ArticuloViewSet(viewsets.ModelViewSet):
    """
    API Endpoint para CRUD de Articulo.
    """
    queryset = Articulo.objects.all()
    serializer_class = ArticuloSerializer
    filterset_fields = '__all__'

    def get_permissions(self):
        """
        Asigna permisos dependiendo del método HTTP.
        """
        if self.action == 'list' or self.action == 'retrieve':  # Para GET (ver)
            permission_classes = [permissions.AllowAny]  # Permite a cualquiera ver los datos
        else:  # Para POST, PUT, PATCH, DELETE (editar o agregar)
            permission_classes = [permissions.IsAuthenticated]  # Solo los autenticados pueden modificar

        return [permission() for permission in permission_classes]


class ImagenViewSet(viewsets.ModelViewSet):
    """
    API Endpoint para CRUD de Imagen.
    """
    queryset = Imagen.objects.all()
    serializer_class = ImagenSerializer
    filterset_fields = '__all__'

    def get_permissions(self):
        """
        Asigna permisos dependiendo del método HTTP.
        """
        if self.action == 'list' or self.action == 'retrieve':  # Para GET (ver)
            permission_classes = [permissions.AllowAny]  # Permite a cualquiera ver los datos
        else:  # Para POST, PUT, PATCH, DELETE (editar o agregar)
            permission_classes = [permissions.IsAuthenticated]  # Solo los autenticados pueden modificar

        return [permission() for permission in permission_classes]


################################################  Intento de Filtro 

