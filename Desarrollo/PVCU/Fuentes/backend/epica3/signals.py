from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.conf import settings
from .models import Articulo_Etiqueta, Etiqueta

@receiver(post_migrate)
def create_etiquetas(sender, **kwargs):

    if sender.name == 'epica3':
        # las etiquetas son sobre articulos que se venden
        etiquetas = [
            {'nombre': 'Tecnología', 'descripcion': 'Artículos tecnológicos'},
            {'nombre': 'Hogar', 'descripcion': 'Artículos para el hogar'},
            {'nombre': 'Deportes', 'descripcion': 'Artículos deportivos'},
            {'nombre': 'Moda', 'descripcion': 'Artículos de moda'},
            {'nombre': 'Salud', 'descripcion': 'Artículos de salud'},
            {'nombre': 'Juguetes', 'descripcion': 'Artículos de juguetes'},
            {'nombre': 'Libros', 'descripcion': 'Artículos de libros'},
            {'nombre': 'Música', 'descripcion': 'Artículos de música'},
            {'nombre': 'Electrodomésticos', 'descripcion': 'Artículos de electrodomésticos'},
            {'nombre': 'Mascotas', 'descripcion': 'Artículos de mascotas'},
        ]

        for etiqueta_data in etiquetas:
            Etiqueta.objects.get_or_create(nombre=etiqueta_data['nombre'], defaults=etiqueta_data)
