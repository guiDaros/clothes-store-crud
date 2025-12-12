from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Marca, Categoria, Produto, Tag, Banner, Pedido, ConfiguracaoLoja  
from .serializers import *

class ConfiguracaoLojaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ConfiguracaoLoja.objects.filter(id=1)
    serializer_class = ConfiguracaoLojaSerializer
    
    def get_queryset(self):
        config, _ = ConfiguracaoLoja.objects.get_or_create(id=1)
        return ConfiguracaoLoja.objects.filter(id=1)

class MarcaViewSet(viewsets.ReadOnlyModelViewSet):  
    queryset = Marca.objects.all()
    serializer_class = MarcaSerializer

# SUBSTITUIR a classe CategoriaViewSet atual por esta:

class CategoriaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    
    @action(detail=False, methods=['get'])
    def pais(self, request):
        # APENAS LIMITA A 5 CATEGORIAS PAI
        categorias_pai = Categoria.objects.filter(parent__isnull=True)[:5]
        
        # O serializer recursivo já inclui TODA a árvore
        serializer = self.get_serializer(categorias_pai, many=True)
        return Response(serializer.data)

class ProdutoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Produto.objects.filter(ativo=True)
    serializer_class = ProdutoSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['categoria', 'marca', 'tags', 'destaque']  
    
    @action(detail=False, methods=['get'])
    def buscar(self, request):
        query = request.query_params.get('q', '')
        if query:
            produtos = Produto.objects.filter(
                nome__icontains=query, 
                ativo=True
            )
            serializer = self.get_serializer(produtos, many=True)
            return Response(serializer.data)
        return Response([])

class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class BannerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Banner.objects.filter(ativo=True).order_by('ordem')
    serializer_class = BannerSerializer

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all().order_by('-data_hora')
    
    def get_serializer_class(self):
        if self.action == 'create':
            return CriarPedidoSerializer
        return PedidoSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)