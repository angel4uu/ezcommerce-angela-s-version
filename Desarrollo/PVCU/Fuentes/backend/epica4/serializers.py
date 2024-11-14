from rest_framework import serializers
from .models import Catalogo, Articulo

class CatalogoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Catalogo
        fields = '__all__'
        # campo user_id solo se puede modificar cuando se crea, no cuando se actualiza
        extra_kwargs = {'usuario_id': {'read_only': True}}

    def validate(self, attrs):
        if attrs['espacio_ocupado'] > attrs['capacidad_maxima']:
            raise serializers.ValidationError('El espacio ocupado no puede ser mayor que la capacidad máxima.')
        return attrs

class ArticuloSerializer(serializers.ModelSerializer):

    class Meta:
        model = Articulo
        fields = '__all__'

    def validate(self, attrs):
        if self.instance is None:
            if attrs.get('catalogo') is None:
                raise serializers.ValidationError({"catalogo": "Catalogo es obligatorio."})
        return attrs
