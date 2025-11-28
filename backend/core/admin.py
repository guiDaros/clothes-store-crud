from django.contrib import admin
from .models import Categoria, Produto, Tag, Banner, Pedido

class CategoriaAdmin(admin.ModelAdmin):
    list_display = ['nome', 'parent', 'get_nivel']
    list_filter = ['parent']
    search_fields = ['nome']

class ProdutoAdmin(admin.ModelAdmin):
    list_display = ['nome', 'preco', 'categoria', 'destaque', 'ativo']
    list_filter = ['categoria', 'tags', 'destaque', 'ativo']
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
        return False  # Pedidos são criados apenas via API

# Registrar os models no admin
admin.site.register(Categoria, CategoriaAdmin)
admin.site.register(Produto, ProdutoAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Banner, BannerAdmin)
admin.site.register(Pedido, PedidoAdmin)