from django.db import models

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
    imagem = models.URLField(blank=True)  # URL simples
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, blank=True)
    destaque = models.BooleanField(default=False)
    ativo = models.BooleanField(default=True)
    
    class Meta:
        verbose_name_plural = "Produtos"
    
    def __str__(self):
        return self.nome

class Banner(models.Model):
    imagem = models.URLField(blank=True)  # URL simples
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