from rest_framework import serializers
from .models import Etiqueta, Catalogo, Articulo, Imagen

class EtiquetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etiqueta
        fields = '__all__'

class CatalogoSerializer(serializers.ModelSerializer):
    id_usuario = serializers.IntegerField(source='id_usuario.id')
    id_marca = serializers.IntegerField(source='id_marca.id')
    class Meta:
        model = Catalogo
        fields = '__all__'

class ArticuloSerializer(serializers.ModelSerializer):    
    id_catalogo = serializers.IntegerField(source='id_catalogo.id')
    class Meta:
        model = Articulo
        fields = '__all__'

class ImagenSerializer(serializers.ModelSerializer):    
    id_articulo = serializers.IntegerField(source='id_articulo.id')
    class Meta:
        model = Imagen
        fields = '__all__'