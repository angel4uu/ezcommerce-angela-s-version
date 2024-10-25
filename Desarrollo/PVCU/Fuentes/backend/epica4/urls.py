from django.urls import path
from .views import (
    CatalogoCreateView, CatalogoListView, CatalogoDetailView,
    ArticuloCreateView, ArticuloListView, ArticuloDetailView
)

urlpatterns = [
    # Rutas para Catálogo
    path('catalogos/', CatalogoListView.as_view(), name='catalogo-list'),
    path('catalogos/nuevo/', CatalogoCreateView.as_view(), name='catalogo-create'),
    path('catalogos/<int:pk>/', CatalogoDetailView.as_view(), name='catalogo-detail'),

    # Rutas para Artículo
    path('articulos/', ArticuloListView.as_view(), name='articulo-list'),
    path('articulos/nuevo/', ArticuloCreateView.as_view(), name='articulo-create'),
    path('articulos/<int:pk>/', ArticuloDetailView.as_view(), name='articulo-detail'),
]
