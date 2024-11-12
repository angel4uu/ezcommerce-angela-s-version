from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.views import Response
from .models import Catalogo, Articulo
from .serializers import CatalogoSerializer, ArticuloSerializer

# Create your views here.


class CatalogoCreateView(generics.CreateAPIView):
    queryset = Catalogo.objects.all()
    serializer_class = CatalogoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(usuario_id=self.request.user)

class CatalogoListView(generics.ListAPIView):
    queryset = Catalogo.objects.all()
    serializer_class = CatalogoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Catalogo.objects.filter(usuario_id=self.request.user)


class CatalogoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Catalogo.objects.all()
    serializer_class = CatalogoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return Catalogo.objects.get(id=self.kwargs['pk'], usuario_id=self.request.user)

    def perform_update(self, serializer):
        serializer.save(usuario_id=self.request.user)

    def perform_destroy(self, instance):
        instance.delete()


class ArticuloCreateView(generics.CreateAPIView):
    queryset = Articulo.objects.all()
    serializer_class = ArticuloSerializer
    permission_classes = [permissions.IsAuthenticated]



class ArticuloListView(generics.ListAPIView):
    queryset = Articulo.objects.all()
    serializer_class = ArticuloSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        catalogo_id = self.kwargs['pk']

        if not catalogo_id:
            raise ValueError('No se ha proporcionado un catálogo.')
        # Asegúrate de que el catálogo pertenece al usuario autenticado
        catalogo = Catalogo.objects.filter(id=catalogo_id, usuario_id=self.request.user).first()
        if catalogo:
            return Articulo.objects.filter(catalogo=catalogo)
        else:
            return Articulo.objects.none()


class ArticuloDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Articulo.objects.all()
    serializer_class = ArticuloSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return Articulo.objects.get(id=self.kwargs['pk'])

    def perform_update(self, serializer):
        serializer.save(usuario_id=self.request.user)

    def perform_destroy(self, instance):
        instance.delete()
