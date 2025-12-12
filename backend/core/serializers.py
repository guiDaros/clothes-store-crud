from rest_framework import serializers
from .models import Marca, Categoria, Produto, Tag, Banner, Pedido, ConfiguracaoLoja, Tamanho

class ConfiguracaoLojaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConfiguracaoLoja
        fields = ['logo_url', 'cor_principal', 'modo_escuro', 'telefone_whatsapp', 'endereco', 'email']

class TamanhoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tamanho
        fields = ['id', 'nome']

class MarcaSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Marca
        fields = ['id', 'nome']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'nome']

class CategoriaSerializer(serializers.ModelSerializer):
    subcategorias = serializers.SerializerMethodField()
    
    class Meta:
        model = Categoria
        fields = ['id', 'nome', 'parent', 'subcategorias']
    
    def get_subcategorias(self, obj):
        subcategorias = obj.subcategorias.all()
        return CategoriaSerializer(subcategorias, many=True).data

class ProdutoSerializer(serializers.ModelSerializer):
    categoria_nome = serializers.CharField(source='categoria.nome', read_only=True)
    marca_nome = serializers.CharField(source='marca.nome', read_only=True)  # Já existe
    tags = TagSerializer(many=True, read_only=True)
    tamanhos = TamanhoSerializer(many=True, read_only=True)
    
    class Meta:
        model = Produto
        fields = [
            'id', 
            'nome', 
            'descricao', 
            'preco', 
            'imagem', 
            'categoria', 
            'categoria_nome',  
            'marca', 
            'marca_nome',     
            'tags', 
            'tamanhos', 
            'destaque'
        ]

class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = ['id', 'imagem', 'link', 'ordem']

class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = ['id', 'nome_cliente', 'data_hora', 'itens', 'telefone']
        read_only_fields = ['data_hora']

class CriarPedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = ['nome_cliente', 'itens', 'telefone']