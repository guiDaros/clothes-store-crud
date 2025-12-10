from django.db import models

class Marca(models.Model):
    nome = models.CharField(max_length=100)
    
    class Meta:
        verbose_name_plural = "Marcas"
    
    def __str__(self):
        return self.nome

class Categoria(models.Model):
    nome = models.CharField(max_length=100)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='subcategorias')
    
    class Meta:
        verbose_name_plural = "Categorias"
    
    def __str__(self):
        return self.nome
    
    def get_nivel(self):
        if self.parent is None:
            return 1
        elif self.parent.parent is None:
            return 2
        else:
            return 3

class Tag(models.Model):
    nome = models.CharField(max_length=50)
    
    def __str__(self):
        return self.nome

class Produto(models.Model):
    nome = models.CharField(max_length=200)
    descricao = models.TextField(blank=True)
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    imagem = models.URLField(blank=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    marca = models.ForeignKey(Marca, on_delete=models.SET_NULL, null=True, blank=True)  # NOVO CAMPO
    tags = models.ManyToManyField(Tag, blank=True)
    destaque = models.BooleanField(default=False)
    ativo = models.BooleanField(default=True)
    
    class Meta:
        verbose_name_plural = "Produtos"
    
    def __str__(self):
        return self.nome

class Banner(models.Model):
    imagem = models.URLField(blank=True)
    link = models.CharField(max_length=200, blank=True)
    ordem = models.IntegerField(default=0)
    ativo = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['ordem']

class Pedido(models.Model):
    nome_cliente = models.CharField(max_length=100)
    data_hora = models.DateTimeField(auto_now_add=True)
    itens = models.JSONField()
    telefone = models.CharField(max_length=20, blank=True)
    
    class Meta:
        verbose_name_plural = "Pedidos"
    
    def __str__(self):
        return f"Pedido de {self.nome_cliente} - {self.data_hora.strftime('%d/%m/%Y %H:%M')}"
    
# Adicione este model no final do arquivo
class ConfiguracaoLoja(models.Model):
    logo_url = models.URLField(blank=True, default='')
    cor_principal = models.CharField(max_length=7, default='#111111')  # formato HEX
    modo_escuro = models.BooleanField(default=False)
    telefone_whatsapp = models.CharField(max_length=20, blank=True, default='')
    endereco = models.TextField(blank=True, default='')
    email = models.CharField(max_length=100, blank=True, default='')
    
    class Meta:
        verbose_name_plural = "Configurações da Loja"
    
    def __str__(self):
        return "Configurações da Loja"
    
    def save(self, *args, **kwargs):
        # Garante que só existe uma configuração
        self.id = 1
        super().save(*args, **kwargs)
    
    @classmethod
    def get_configuracao(cls):
        obj, created = cls.objects.get_or_create(id=1)
        return obj