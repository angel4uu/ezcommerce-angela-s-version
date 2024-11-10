from django.shortcuts import render
from .serializers import ReporteSerializer
from rest_framework import generics, permissions
from .models import Reporte

# Create your views here.
#
# Crear reporte

class ReporteCreate(generics.CreateAPIView):

    serializer_class = ReporteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(usuario_id=self.request.user)


# Listar reportes, si el usuario es staff puede ver todos los reportes, si no solo los suyos
class ReporteList(generics.ListAPIView):

        serializer_class = ReporteSerializer
        permission_classes = [permissions.IsAuthenticated]

        def get_queryset(self):
            if self.request.user.is_staff:
                return Reporte.objects.all().order_by('-fecha_reporte')
            else:
                return Reporte.objects.filter(usuario_id=self.request.user).order_by('-fecha_reporte')
