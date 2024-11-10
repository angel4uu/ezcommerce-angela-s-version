from django.db import models
from epica1.models import User

# Create your models here.


class Reporte(models.Model):
    usuario_id = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    titulo = models.CharField(max_length=50, null=False, blank=False)
    descripcion = models.TextField(null=False, blank=False)
    fecha_reporte = models.DateTimeField(auto_now_add=True)
