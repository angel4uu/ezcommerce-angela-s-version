from rest_framework import serializers
from .models import *

class FacultadSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Facultad
        fields = '__all__'

class EscuelaProfesionalSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = EscuelaProfesional
        fields = '__all__'