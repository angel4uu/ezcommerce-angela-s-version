from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import *
from .models import *
from epica1.models import Usuario
from epica2.models import EscuelaProfesional, Facultad
from rest_framework.permissions import AllowAny
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend

#------------------------------------------------------> Filtros <----------------------------------------------------------

class ArticuloFilter(filters.FilterSet):
    nombre = filters.CharFilter(field_name='nombre', lookup_expr='icontains')
    id_catalogo__id_usuario__id_escuela__id_facultad__siglas = filters.CharFilter(
        field_name='id_catalogo__id_usuario__id_escuela__id_facultad__siglas', lookup_expr='icontains')
    id_catalogo__id_usuario__id_escuela__nombre = filters.CharFilter(
        field_name='id_catalogo__id_usuario__id_escuela__nombre', lookup_expr='icontains')

    
    class Meta:
        model = Articulo
        fields = [
            'nombre', 'etiquetas', 'disponible',
            'id_catalogo__id_usuario',
            'id_catalogo__id_marca',
            'id_catalogo__id_usuario__id_escuela__id_facultad__siglas',
            'id_catalogo__id_usuario__id_escuela__nombre',
        ]



#------------------------------------------------------> Vistas <----------------------------------------------------------

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
    #filter_class = ArticuloFilter

    filterset_fields = [ 
        'nombre', 'etiquetas', 'disponible', 
        'id_catalogo__id_usuario', # Filtrar por catálogo
        'id_catalogo__id_marca', # Filtrar por marca
        'id_catalogo__id_usuario__id_escuela__id_facultad__siglas',  # Filtrar por facultad
        'id_catalogo__id_usuario__id_escuela__nombre',  # Ejemplo para filtrar por nombre de escuela
    ]

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



