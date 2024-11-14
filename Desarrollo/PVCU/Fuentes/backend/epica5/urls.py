from django.urls import path
from .views import MarcaCreateView, MarcaView, MarcaDetailView

urlpatterns = [
    path('marca/register/', MarcaCreateView.as_view(), name='register'),
    path('marca/', MarcaView.as_view(), name='marca'),
    path('marca/<int:pk>/', MarcaDetailView.as_view(), name='marca-detail'),
]
