from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'code', 'birth_date', 'escuela']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, attrs):
        if self.instance is None:
            if not attrs.get('is_staff', False):
                if not attrs.get('escuela'):
                    raise serializers.ValidationError({"escuela": "Escuela es obligatorio para usuarios no staff."})

            if attrs.get('code', None) is None:
                raise serializers.ValidationError({"code": "Código es obligatorio."})

        return attrs




    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            code=validated_data.get('code', ''),
            birth_date=validated_data.get('birth_date', None),
            escuela=validated_data.get('escuela', None)
        )
        return user
