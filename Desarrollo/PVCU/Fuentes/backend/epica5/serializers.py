from rest_framework import serializers

from .models import Marca

class MarcaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Marca
        fields = '__all__'
        read_only_fields = ['id', 'usuario']
