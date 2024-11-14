from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .serializers import MarcaSerializer
# Create your views here.


# quiero que el registerview registre la marca segun el usuario autenticado
class MarcaCreateView(generics.CreateAPIView):

    serializer_class = MarcaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(usuario=request.user)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class MarcaView(generics.ListAPIView):

    serializer_class = MarcaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.marca_set.all()

class MarcaDetailView(generics.RetrieveUpdateDestroyAPIView):

    serializer_class = MarcaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.marca_set.all()

    def get_object(self):
        return self.get_queryset().get(id=self.kwargs['pk'])

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
