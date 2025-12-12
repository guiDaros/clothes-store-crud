from django.contrib import admin
from .models import Marca, Categoria, Produto, Tag, Banner, Pedido, ConfiguracaoLoja, Tamanho

class TamanhoAdmin(admin.ModelAdmin):
    list_display = ['nome', 'ordem']
    list_editable = ['ordem']


class MarcaAdmin(admin.ModelAdmin):
    list_display = ['nome']
    search_fields = ['nome']

class CategoriaAdmin(admin.ModelAdmin):
    list_display = ['nome', 'parent', 'get_nivel']
    list_filter = ['parent']
    search_fields = ['nome']

class ProdutoAdmin(admin.ModelAdmin):
    list_display = ['nome', 'preco', 'categoria', 'marca', 'destaque', 'ativo']  # Adicione marca
    list_filter = ['categoria', 'marca', 'tags', 'destaque', 'ativo']  # Adicione marca
    search_fields = ['nome', 'descricao']
    filter_horizontal = ['tags']

class TagAdmin(admin.ModelAdmin):
    list_display = ['nome']
    search_fields = ['nome']

class BannerAdmin(admin.ModelAdmin):
    list_display = ['imagem', 'ordem', 'ativo']
    list_editable = ['ordem', 'ativo']

class PedidoAdmin(admin.ModelAdmin):
    list_display = ['nome_cliente', 'data_hora', 'telefone']
    list_filter = ['data_hora']
    search_fields = ['nome_cliente', 'telefone']
    readonly_fields = ['data_hora']

    def has_add_permission(self, request):
        return False
    
class ConfiguracaoLojaAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return False  # Só permite uma configuração
    
    def has_delete_permission(self, request, obj=None):
        return False

# Registrar os models no admin
admin.site.register(ConfiguracaoLoja, ConfiguracaoLojaAdmin)
admin.site.register(Marca, MarcaAdmin) 
admin.site.register(Categoria, CategoriaAdmin)
admin.site.register(Produto, ProdutoAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Banner, BannerAdmin)
admin.site.register(Pedido, PedidoAdmin)