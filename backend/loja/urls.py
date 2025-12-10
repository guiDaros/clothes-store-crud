from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from core.views import MarcaViewSet, CategoriaViewSet, ProdutoViewSet, TagViewSet, BannerViewSet, PedidoViewSet, ConfiguracaoLojaViewSet  

router = DefaultRouter()
router.register(r'configuracao', ConfiguracaoLojaViewSet) 
router.register(r'marcas', MarcaViewSet) 
router.register(r'categorias', CategoriaViewSet)
router.register(r'produtos', ProdutoViewSet)
router.register(r'tags', TagViewSet)
router.register(r'banners', BannerViewSet)
router.register(r'pedidos', PedidoViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]