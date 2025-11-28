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
import { useProdutos } from '../../hooks/useProdutos';
import { useCarrinho } from '../../context/CarrinhoContext';

function ProdutosGrid() {
  const { produtos, loading, error } = useProdutos(false);
  const { adicionarAoCarrinho } = useCarrinho();

  const handleAdicionarCarrinho = (produto) => {
    adicionarAoCarrinho(produto);
    alert(`${produto.nome} adicionado ao carrinho!`);
  };

  if (loading) {
    return (
      <Container>
        <Titulo>Todos os Produtos</Titulo>
        <div>Carregando produtos...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Titulo>Todos os Produtos</Titulo>
        <div>{error}</div>
      </Container>
    );
  }

  if (produtos.length === 0) {
    return (
      <Container>
        <Titulo>Todos os Produtos</Titulo>
        <div>Nenhum produto cadastrado</div>
      </Container>
    );
  }

  return (
    <Container>
      <Titulo>Todos os Produtos</Titulo>
      <Grid>
        {produtos.map(produto => (
          <ProdutoCard key={produto.id}>
            <ProdutoImagem>
              {produto.imagem ? (
                <img 
                  src={produto.imagem} 
                  alt={produto.nome}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                />
              ) : (
                'Imagem'
              )}
            </ProdutoImagem>
            <ProdutoNome>{produto.nome}</ProdutoNome>
            <ProdutoPreco>R$ {produto.preco}</ProdutoPreco>
            <BotaoAdicionar 
              onClick={() => handleAdicionarCarrinho(produto)}
            >
              Adicionar ao Carrinho
            </BotaoAdicionar>
          </ProdutoCard>
        ))}
      </Grid>
    </Container>
  );
}

export default ProdutosGrid;