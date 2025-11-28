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

function ProdutosDestaque() {
  const { produtos, loading, error } = useProdutos(true); // true = apenas destaques

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
          </ProdutoCard>
        ))}
      </ListaProdutos>
    </Container>
  );
}

export default ProdutosDestaque;