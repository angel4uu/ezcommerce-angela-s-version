from django.db import models
from epica4.models import Articulo

# Create your models here.

class Etiqueta(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()

class Articulo_Etiqueta(models.Model):
    articulo = models.ForeignKey(Articulo, on_delete=models.CASCADE)
    etiqueta = models.ForeignKey(Etiqueta, on_delete=models.CASCADE)
