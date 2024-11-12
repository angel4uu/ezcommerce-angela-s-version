from django.shortcuts import render
from epica4.models import Articulo
from epica4.serializers import ArticuloSerializer
from rest_framework import generics, permissions
from .serializers import EtiquetaSerializer, Articulo_EtiquetaSerializer
from .models import Etiqueta, Articulo_Etiqueta


class ArticuloList(generics.ListCreateAPIView):

    queryset = Articulo.objects.all()
    serializer_class = ArticuloSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Articulo.objects.all()
        nombre = self.request.query_params.get('nombre', None)
        if nombre is not None:
            queryset = queryset.filter(nombre__icontains=nombre)
        return queryset

    def get_serializer_context(self):
        return {'request': self.request}

class EtiquetaList(generics.ListCreateAPIView):

    queryset = Etiqueta.objects.all()
    serializer_class = EtiquetaSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Etiqueta.objects.all()
        nombre = self.request.query_params.get('nombre', None)
        if nombre is not None:
            queryset = queryset.filter(nombre__icontains=nombre)
        return queryset

    def get_serializer_context(self):
        return {'request': self.request}

class Articulo_EtiquetaList(generics.ListCreateAPIView):

    queryset = Articulo_Etiqueta.objects.all()
    serializer_class = Articulo_EtiquetaSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Articulo_Etiqueta.objects.all()
        return queryset

    def get_serializer_context(self):
        return {'request': self.request}
