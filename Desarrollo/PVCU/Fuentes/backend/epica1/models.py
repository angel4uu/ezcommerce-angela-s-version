from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class Facultad(models.Model):
    codigo = models.CharField(max_length=2, unique=True, null=False, blank=False)
    nombre = models.CharField(max_length=100, null=False, blank=False)

class EscuelaProfesional(models.Model):
    facultad = models.ForeignKey(Facultad, on_delete=models.CASCADE, null=False, blank=False)
    codigo = models.CharField(max_length=20, unique=True, null=False, blank=False)
    nombre = models.CharField(max_length=100, null=False, blank=False)

class User(AbstractUser):
    code = models.CharField(max_length=10, unique=True, null=False, blank=False)
    birth_date = models.DateField(null=True, blank=True)
    escuela = models.ForeignKey(EscuelaProfesional, on_delete=models.CASCADE, null=True, blank=True)
