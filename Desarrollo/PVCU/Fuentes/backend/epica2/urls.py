from django.urls import path
from .views import UserUpdateView, UserDeleteView

urlpatterns = [
    # # Rutas para Usuario
    # actualiza los datos del usuario autenticado
    path('profile/update/', UserUpdateView.as_view(), name='user-update'),
    # elimina la cuenta del usuario autenticado
    path('profile/delete/', UserDeleteView.as_view(), name='user-delete'),
]
