from django.db import models
from epica1.models import User

# Create your models here.
class Marca(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    nombre = models.CharField(max_length=100, null=False, blank=False)
    descripcion = models.TextField(null=True, blank=True)
    logo = models.CharField(max_length=100, null=True, blank=True)
