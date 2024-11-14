from django.db import models
from epica1.models import User
from django.core.validators import MinValueValidator
from django.core.exceptions import ValidationError

# Create your models here.

class Catalogo(models.Model):
    usuario_id = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    capacidad_maxima = models.IntegerField(validators=[MinValueValidator(15)],null=False, blank=False)
    espacio_ocupado = models.IntegerField(validators=[MinValueValidator(0)],null=False, blank=False)

    def clean(self):
        if self.espacio_ocupado > self.capacidad_maxima:
            raise ValidationError('El espacio ocupado no puede ser mayor que la capacidad máxima.')




class Articulo(models.Model):
    catalogo = models.ForeignKey(Catalogo, on_delete=models.CASCADE, null=False, blank=False)
    nombre = models.CharField(max_length=50, null=False, blank=False)
    descripcion = models.CharField(max_length=100, null=True, blank=True)
    stock = models.IntegerField(validators=[MinValueValidator(0)],null=False, blank=False)
    disponible = models.BooleanField(default=True, null=False, blank=False)
    precio = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    imagen = models.TextField(null=True, blank=True)
