from django.urls import path
from .views import RegisterView, UserProfielView

urlpatterns = [
    # # Rutas para Usuario
    # registra un nuevo usuario
    path('register/', RegisterView.as_view(), name='register'),
    # obtiene los datos del usuario autenticado
    path('profile/', UserProfielView.as_view(), name='profile'),
]
