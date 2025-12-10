import React, { useState } from 'react';
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
import Filtros from '../Filtros';
import { useCategorias } from '../../hooks/useCategorias';
import { useMarcas } from '../../hooks/useMarcas';

function ProdutosGrid() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [marcaSelecionada, setMarcaSelecionada] = useState(null);
  
  const { produtos, loading, error } = useProdutosFiltrados(categoriaSelecionada, marcaSelecionada);
  const { categorias, loading: loadingCategorias, error: errorCategorias } = useCategorias();
  const { marcas, loading: loadingMarcas, error: errorMarcas } = useMarcas();
  const { adicionarAoCarrinho } = useCarrinho();

  const handleAdicionarCarrinho = (produto) => {
    adicionarAoCarrinho(produto);
    alert(`${produto.nome} adicionado ao carrinho!`);
  };

  const handleLimparFiltros = () => {
    setCategoriaSelecionada(null);
    setMarcaSelecionada(null);
  };

  // Loading geral
  if (loadingCategorias || loadingMarcas) {
    return (
      <Container>
        <Titulo>Todos os Produtos</Titulo>
        <div>Carregando filtros...</div>
      </Container>
    );
  }

  // Erros nos filtros
  if (errorCategorias || errorMarcas) {
    return (
      <Container>
        <Titulo>Todos os Produtos</Titulo>
        <div>Erro ao carregar filtros. Recarregue a página.</div>
      </Container>
    );
  }

  return (
    <Container>
      <Titulo>Todos os Produtos</Titulo>
      
      <Filtros
        categorias={categorias}
        marcas={marcas}
        categoriaSelecionada={categoriaSelecionada}
        marcaSelecionada={marcaSelecionada}
        onCategoriaChange={setCategoriaSelecionada}
        onMarcaChange={setMarcaSelecionada}
        onLimparFiltros={handleLimparFiltros}
      />

      {error ? (
        <div style={{ color: 'red', padding: '1rem' }}>
          Erro: {error}
        </div>
      ) : loading ? (
        <div>Carregando produtos...</div>
      ) : produtos.length === 0 ? (
        <div>
          {categoriaSelecionada || marcaSelecionada 
            ? 'Nenhum produto encontrado com os filtros aplicados' 
            : 'Nenhum produto cadastrado'}
        </div>
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
              {produto.marca_nome && (
                <Marca>{produto.marca_nome}</Marca>
              )}
              <ProdutoPreco>R$ {produto.preco}</ProdutoPreco>
              <BotaoAdicionar 
                onClick={() => handleAdicionarCarrinho(produto)}
              >
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