import React from 'react';
import { Container, Titulo, ListaProdutos, ProdutoCard, ProdutoImagem, ProdutoNome, ProdutoPreco } from './styles';

function ProdutosDestaque() {
  // Dados mockados temporários - depois vem da API
  const produtosMock = [
    { id: 1, nome: 'Camiseta Básica', preco: 'R$ 49,90' },
    { id: 2, nome: 'Calça Jeans', preco: 'R$ 129,90' },
    { id: 3, nome: 'Tênis Esportivo', preco: 'R$ 199,90' },
    { id: 4, nome: 'Moletom', preco: 'R$ 89,90' },
  ];

  return (
    <Container>
      <Titulo>Produtos em Destaque</Titulo>
      <ListaProdutos>
        {produtosMock.map(produto => (
          <ProdutoCard key={produto.id}>
            <ProdutoImagem>Imagem</ProdutoImagem>
            <ProdutoNome>{produto.nome}</ProdutoNome>
            <ProdutoPreco>{produto.preco}</ProdutoPreco>
          </ProdutoCard>
        ))}
      </ListaProdutos>
    </Container>
  );
}

export default ProdutosDestaque;