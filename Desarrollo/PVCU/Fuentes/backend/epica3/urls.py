from .views import ArticuloList
from django.urls import path

urlpatterns = [
    path('articulos/byname/', ArticuloList.as_view(), name='articulo_list'),
]
