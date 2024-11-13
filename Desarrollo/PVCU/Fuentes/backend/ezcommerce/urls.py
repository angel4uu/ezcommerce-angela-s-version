"""
URL configuration for ezcommerce project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

from rest_framework import routers

from epica4 import views as views_epica4
from epica2 import views as views_epica2
from epica1 import views as views_epica1

router = routers.DefaultRouter()

# epica1
router.register(r'usuarios', views_epica1.UsuarioViewSet)
router.register(r'roles', views_epica1.GroupViewSet)

# epica2
router.register(r'facultades', views_epica2.FacultadViewSet)
router.register(r'escuelasprofesionales', views_epica2.EscuelaProfesionalViewSet)

# epica4
router.register(r'etiquetas', views_epica4.EtiquetaViewSet)
router.register(r'catalogos', views_epica4.CatalogoViewSet)
router.register(r'articulos', views_epica4.ArticuloViewSet)
router.register(r'imagenes', views_epica4.ImagenViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path("admin", admin.site.urls)
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)