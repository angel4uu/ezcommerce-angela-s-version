from rest_framework import serializers
from .models import Etiqueta, Catalogo, Articulo, Imagen
from epica5.models import Marca

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
    id_marca = serializers.SerializerMethodField()

    class Meta:
        model = Articulo
        fields = '__all__'

    def get_id_marca(self, obj):
        # Verifica si `id_marca` en `id_catalogo` es None y maneja el caso.
        return obj.id_catalogo.id_marca.id if obj.id_catalogo.id_marca else None
    

class ImagenSerializer(serializers.ModelSerializer):    
    id_articulo = serializers.IntegerField(source='id_articulo.id')
    class Meta:
        model = Imagen
        fields = '__all__'