from .views import ReporteCreate, ReporteList
from django.urls import path

urlpatterns = [
    path('reporte/', ReporteCreate.as_view(), name='reporte-create'),
    path('reporte/list/', ReporteList.as_view(), name='reporte-list'),
]
