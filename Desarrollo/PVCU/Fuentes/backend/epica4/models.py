from django.db import models
from epica1.models import *
from django.core.exceptions import ValidationError

class Etiqueta(models.Model):
    nombre = models.CharField("Nombre", max_length=50, unique=True)
    descripcion = models.TextField("Descripción")
    
    def __str__(self):
        return self.nombre
    class Meta:
        verbose_name = "Etiqueta"
        verbose_name_plural = "Etiquetas"
        db_table = "Etiqueta"


class Catalogo(models.Model):
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, verbose_name = "Dueño")
    capacidad_maxima = models.IntegerField("Límite", default=15)
    espacio_ocupado = models.ImageField("Espacio ocupado", default=0)

    def clean(self):
        super().clean()
        if self.espacio_ocupado > self.capacidad_maxima:
            raise ValidationError("Parece que te quedaste sin espacio. ¡Es un buen momento para actualizar tu plan!")
        
        if self.espacio_ocupado < 0:
            self.espacio_ocupado = 0

    def save(self, *args, **kwargs):
        self.full_clean()  
        super().save(*args, **kwargs)

    def __str__(self):
        return 'Catálogo de ' + self.id_usuario.nombres + ' ' + self.id_usuario.apellido_p + ' ' + self.id_usuario.apellido_m
    class Meta:
        verbose_name = "Catalogo"
        verbose_name_plural = "Catalogos"
        db_table = "Catalogo"



class Articulo(models.Model):
    id_catalogo = models.ForeignKey(Catalogo, on_delete=models.CASCADE, verbose_name = "Vendedor")
    nombre = models.CharField("Nombre", max_length=100, unique=True)
    descripcion = models.TextField("Descripción")
    stock = models.IntegerField("Stock disponible", default=1)
    etiquetas = models.ManyToManyField(Etiqueta)
    disponible = models.BooleanField("Disponible", default=True)

    def save(self, *args, **kwargs):
        if self.stock < 0:
            self.stock = 0
        
        self.disponible = self.stock > 0
        
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nombre
    class Meta:
        verbose_name = "Articulo"
        verbose_name_plural = "Articulos"
        db_table = "Articulo"


class Imagen(models.Model):
    id_articulo = models.ForeignKey(Articulo, on_delete=models.CASCADE, verbose_name = "Artículo")
    url = models.URLField("URL")

    def __str__(self):
        return self.id_articulo.nombre
    class Meta:
        verbose_name = "Imagen"
        verbose_name_plural = "Imagenes"
        db_table = "Imagen"


