# Generated by Django 5.1.3 on 2024-11-13 21:30

import django.contrib.auth.models
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('epica2', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('username', models.CharField(max_length=100, unique=True, verbose_name='Nombre de usuario')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='Correo electrónico')),
                ('nombres', models.CharField(max_length=200, verbose_name='Nombres')),
                ('apellido_p', models.CharField(blank=True, max_length=200, null=True, verbose_name='Apellido paterno')),
                ('apellido_m', models.CharField(blank=True, max_length=200, null=True, verbose_name='Apellido materno')),
                ('celular', models.CharField(blank=True, max_length=20, null=True, verbose_name='Celular')),
                ('codigo', models.CharField(max_length=100, unique=True, verbose_name='Código de estudiante')),
                ('fecha_nacimiento', models.DateTimeField(blank=True, null=True, verbose_name='Fecha de nacimiento')),
                ('codigoqr', models.URLField(blank=True, null=True, verbose_name='Código QR')),
                ('usuario_administrador', models.BooleanField(default=False)),
                ('usuario_activo', models.BooleanField(default=True)),
                ('fecha_registro', models.DateTimeField(auto_now_add=True)),
                ('id_escuela', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='epica2.escuelaprofesional', verbose_name='Escuela Profesional')),
            ],
            options={
                'verbose_name': 'Usuario',
                'verbose_name_plural': 'Usuarios',
            },
        ),
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, unique=True, verbose_name='name')),
                ('permissions', models.ManyToManyField(blank=True, to='auth.permission', verbose_name='permissions')),
            ],
            options={
                'verbose_name': 'group',
                'verbose_name_plural': 'groups',
            },
            managers=[
                ('objects', django.contrib.auth.models.GroupManager()),
            ],
        ),
    ]
