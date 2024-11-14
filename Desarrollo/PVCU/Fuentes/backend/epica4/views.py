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
from rest_framework.filters import OrderingFilter
from .pagination import CustomArticuloPagination

#------------------------------------------------------> Filtros <----------------------------------------------------------

class ArticuloFilter(filters.FilterSet):
    nombre = filters.CharFilter(field_name='nombre', lookup_expr='icontains')
    id_catalogo__id_usuario__id_escuela__id_facultad__siglas = filters.CharFilter(
        field_name='id_catalogo__id_usuario__id_escuela__id_facultad__siglas', lookup_expr='icontains')    
    id_catalogo__id_usuario__id_escuela__nombre = filters.CharFilter(
        field_name='id_catalogo__id_usuario__id_escuela__nombre', lookup_expr='icontains')    
    precio_min = filters.NumberFilter(field_name='precio', lookup_expr='gte') 
    precio_max = filters.NumberFilter(field_name='precio', lookup_expr='lte')  

    class Meta:
        model = Articulo
        fields = [
            'nombre', 'etiquetas', 'disponible',
            'id_catalogo__id_usuario',
            'id_catalogo__id_marca',
            'id_catalogo__id_usuario__id_escuela__id_facultad__siglas',
            'id_catalogo__id_usuario__id_escuela',
            'precio_min', 'precio_max', 
        ]


class CatalogoFilter(filters.FilterSet):
    id_usuario__id_escuela__id_facultad__siglas = filters.CharFilter(
        field_name='id_usuario__id_escuela__id_facultad__siglas', lookup_expr='icontains')    
    id_usuario__id_escuela__nombre = filters.CharFilter(
        field_name='id_usuario__id_escuela__nombre', lookup_expr='icontains')   

    class Meta:
        model = Catalogo
        fields = [            
            'id_usuario',
            'id_marca',
            'id_usuario__id_escuela__id_facultad__siglas',
            'id_usuario__id_escuela__nombre'
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
    filterset_class = CatalogoFilter  
    filter_backends = [DjangoFilterBackend]

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
    filterset_class = ArticuloFilter  
    filter_backends = [DjangoFilterBackend, OrderingFilter]

    ordering_fields = [
        # Ordenar por nombre de la marca: ?ordering=id_marca__nombre
        'id_marca__nombre',  

        # Ordenar por nombre de la facultad: ?ordering=id_catalogo__id_usuario__id_escuela__id_facultad__nombre        
        'id_catalogo__id_usuario__id_escuela__id_facultad__nombre', 
        
        # Ordenar por nombre de la escuela profesional: ?ordering=id_catalogo__id_usuario__id_escuela__nombre
        'id_catalogo__id_usuario__id_escuela__nombre',

        # Ordenar por nombre del artículo: ?ordering=nombre
        'nombre', 
        
        # Ordenar por precio ascendente: ?ordering=precio
        # Ordenar por precio descendente: ?ordering=-precio
        'precio', 

        # Ordenar por nombre de etiquetas
        'etiquetas__nombre',   
    ]
    ordering = ['nombre']  # Orden predeterminado
    pagination_class = CustomArticuloPagination  # Usa la clase de paginación personalizada


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



