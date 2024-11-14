from django.urls import path
from .views import (
    CatalogoCreateView, CatalogoListView, CatalogoDetailView,
    ArticuloCreateView, ArticuloListView, ArticuloDetailView
)

urlpatterns = [
    # # Rutas para Catálogo
    # lista los catalogos del usuario autenticado basandose en el jwt
    path('catalogos/', CatalogoListView.as_view(), name='catalogo-list'),
    # crea un nuevo catalogo, asignando el usuario autenticado
    path('catalogo/nuevo/', CatalogoCreateView.as_view(), name='catalogo-create'),
    # muestra un catalogo detalladamente en base a su id
    path('catalogo/<int:pk>/', CatalogoDetailView.as_view(), name='catalogo-detail'),

    # # Rutas para Artículo
    # lista los articulos en base al catalogo, cuyo id es pasado como parametro
    path('articulos/<int:pk>/', ArticuloListView.as_view(), name='articulo-list'),
    # crea un nuevo articulo
    path('articulo/nuevo/', ArticuloCreateView.as_view(), name='articulo-create'),
    # muestra un articulo detalladamente en base a su id
    path('articulo/<int:pk>/', ArticuloDetailView.as_view(), name='articulo-detail'),
]
