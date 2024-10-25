from django.urls import path
from .views import UserUpdateView, UserDeleteView

urlpatterns = [
    path('profile/update/', UserUpdateView.as_view(), name='user-update'),
    path('profile/delete/', UserDeleteView.as_view(), name='user-delete'),
]
