import React from 'react';
import { 
  Container, 
  Titulo, 
  Grid, 
  ProdutoCard, 
  ProdutoImagem, 
  ProdutoNome, 
  ProdutoPreco, 
  BotaoAdicionar,
  Marca 
} from './styles';
import { useProdutosFiltrados } from '../../hooks/useProdutosFiltrados';
import { useCarrinho } from '../../context/CarrinhoContext';

function ProdutosGrid() {
  const { produtos, loading, error } = useProdutosFiltrados(null, null);
  const { adicionarAoCarrinho } = useCarrinho();

  const handleAdicionarCarrinho = (produto) => {
    adicionarAoCarrinho(produto);
    alert(`${produto.nome} adicionado ao carrinho!`);
  };

  return (
    <Container>
      <Titulo>Todos os Produtos</Titulo>
      
      {error ? (
        <div style={{ color: 'red', padding: '1rem' }}>
          Erro: {error}
        </div>
      ) : loading ? (
        <div>Carregando produtos...</div>
      ) : produtos.length === 0 ? (
        <div>Nenhum produto cadastrado</div>
      ) : (
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
              {produto.marca_nome && <Marca>{produto.marca_nome}</Marca>}
              <ProdutoPreco>R$ {produto.preco}</ProdutoPreco>
              <BotaoAdicionar onClick={() => handleAdicionarCarrinho(produto)}>
                Adicionar ao Carrinho
              </BotaoAdicionar>
            </ProdutoCard>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default ProdutosGrid;