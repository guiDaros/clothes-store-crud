import React from 'react';
import { 
  Container, 
  Titulo, 
  Grid, 
  ProdutoCard, 
  ProdutoImagem, 
  ProdutoNome, 
  ProdutoPreco, 
  BotaoAdicionar 
} from './styles';

function ProdutosGrid() {
  // Dados mockados temporários
  const produtosMock = [
    { id: 1, nome: 'Camiseta Básica Preta', preco: 'R$ 49,90' },
    { id: 2, nome: 'Calça Jeans Slim', preco: 'R$ 129,90' },
    { id: 3, nome: 'Tênis Esportivo', preco: 'R$ 199,90' },
    { id: 4, nome: 'Moletom com Capuz', preco: 'R$ 89,90' },
    { id: 5, nome: 'Blusa de Frio', preco: 'R$ 79,90' },
    { id: 6, nome: 'Shorts Esportivo', preco: 'R$ 59,90' },
  ];

  return (
    <Container>
      <Titulo>Todos os Produtos</Titulo>
      <Grid>
        {produtosMock.map(produto => (
          <ProdutoCard key={produto.id}>
            <ProdutoImagem>Imagem</ProdutoImagem>
            <ProdutoNome>{produto.nome}</ProdutoNome>
            <ProdutoPreco>{produto.preco}</ProdutoPreco>
            <BotaoAdicionar>Adicionar ao Carrinho</BotaoAdicionar>
          </ProdutoCard>
        ))}
      </Grid>
    </Container>
  );
}

export default ProdutosGrid;