from rest_framework import serializers
from .models import Etiqueta, Catalogo, Articulo, Imagen

class EtiquetaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Etiqueta
        fields = '__all__'

class CatalogoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Catalogo
        fields = '__all__'

class ArticuloSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Articulo
        fields = '__all__'

class ImagenSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Imagen
        fields = '__all__'