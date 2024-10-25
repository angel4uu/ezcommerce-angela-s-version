from django.urls import path
from .views import RegisterView, UserProfielView

urlpatterns = [
    path('register', RegisterView.as_view(), name='register'),
    path('profile/', UserProfielView.as_view(), name='profile'),
]
