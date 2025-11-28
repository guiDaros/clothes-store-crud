import React from 'react';
import { 
  Container, 
  Titulo, 
  ListaProdutos, 
  ProdutoCard, 
  ProdutoImagem, 
  ProdutoNome, 
  ProdutoPreco 
} from './styles';
import { useProdutos } from '../../hooks/useProdutos';
import { useCarrinho } from '../../context/CarrinhoContext.jsx';

function ProdutosDestaque() {
  const { produtos, loading, error } = useProdutos(true);
  const { adicionarAoCarrinho } = useCarrinho();

  const handleAdicionarCarrinho = (produto) => {
    adicionarAoCarrinho(produto);
    alert(`${produto.nome} adicionado ao carrinho!`);
  };

  if (loading) {
    return (
      <Container>
        <Titulo>Produtos em Destaque</Titulo>
        <div>Carregando...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Titulo>Produtos em Destaque</Titulo>
        <div>{error}</div>
      </Container>
    );
  }

  if (produtos.length === 0) {
    return (
      <Container>
        <Titulo>Produtos em Destaque</Titulo>
        <div>Nenhum produto em destaque</div>
      </Container>
    );
  }

  return (
    <Container>
      <Titulo>Produtos em Destaque</Titulo>
      <ListaProdutos>
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
            <button 
              onClick={() => handleAdicionarCarrinho(produto)}
              style={{
                background: '#2c5aa0',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Adicionar
            </button>
          </ProdutoCard>
        ))}
      </ListaProdutos>
    </Container>
  );
}

export default ProdutosDestaque;