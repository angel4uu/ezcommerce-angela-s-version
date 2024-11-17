from .models import  Etiqueta, Articulo_Etiqueta
from rest_framework import serializers

class EtiquetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etiqueta
        fields = '__all__'

class Articulo_EtiquetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Articulo_Etiqueta
        fields = '__all__'

    def create(self, validated_data):
        articulo_etiqueta = Articulo_Etiqueta.objects.create(**validated_data)
        return articulo_etiqueta

    def update(self, instance, validated_data):
        instance.articulo = validated_data.get('articulo', instance.articulo)
        instance.etiqueta = validated_data.get('etiqueta', instance.etiqueta)
        instance.save()
        return instance
