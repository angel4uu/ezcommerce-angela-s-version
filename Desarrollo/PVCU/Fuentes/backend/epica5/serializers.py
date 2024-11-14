from rest_framework import serializers
from .models import *

class MarcaSerializer(serializers.ModelSerializer):    
    id_usuario = serializers.IntegerField(source='id_usuario.id')
    class Meta:
        model = Marca
        fields = '__all__'

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = '__all__'

class MembresiaSerializer(serializers.ModelSerializer):
    id_marca = serializers.IntegerField(source='id_marca.id')
    id_plan = serializers.IntegerField(source='id_plan.id')
    class Meta:
        model = Membresia
        fields = '__all__'