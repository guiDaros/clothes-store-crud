import React, { useState } from 'react';
import styled from 'styled-components';
import { useCarrinho } from '../../context/CarrinhoContext';

// Use os estilos atualizados acima...

function ProdutoModal({ produto, aberto, onFechar }) {
  const { adicionarAoCarrinho } = useCarrinho();
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null);
  const [adicionando, setAdicionando] = useState(false);

  if (!produto) return null;

  const handleAdicionarCarrinho = () => {
    if (produto.tamanhos && produto.tamanhos.length > 0 && !tamanhoSelecionado) {
      alert('Por favor, selecione um tamanho');
      return;
    }

    setAdicionando(true);
    
    const produtoComTamanho = {
      ...produto,
      tamanho: tamanhoSelecionado
    };

    adicionarAoCarrinho(produtoComTamanho);
    
    setTimeout(() => {
      setAdicionando(false);
      onFechar();
      alert(`${produto.nome}${tamanhoSelecionado ? ` (Tamanho: ${tamanhoSelecionado})` : ''} adicionado ao carrinho!`);
    }, 300);
  };

  const handleClickOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onFechar();
    }
  };

  return (
    <ModalOverlay $aberto={aberto} onClick={handleClickOverlay}>
      <ModalContainer>
        <ModalFechar onClick={onFechar}>×</ModalFechar>
        
        <ImagemContainer>
          <ImagemProduto 
            src={produto.imagem} 
            alt={produto.nome}
            onError={(e) => {
              e.target.src = 'https://placehold.co/600x600/e5e5e5/999999?text=Imagem+Indisponível';
            }}
          />
        </ImagemContainer>
        
        <ConteudoContainer>
          <TituloProduto>{produto.nome}</TituloProduto>
          
          {produto.marca_nome && (
            <MarcaProduto>{produto.marca_nome}</MarcaProduto>
          )}
          
          <DescricaoProduto>
            {produto.descricao || 'Descrição não disponível para este produto.'}
          </DescricaoProduto>
          
          <PrecoProduto>R$ {parseFloat(produto.preco).toFixed(2)}</PrecoProduto>
          
          {produto.tamanhos && produto.tamanhos.length > 0 && (
            <TamanhosContainer>
              <TamanhosTitulo>Selecione o tamanho:</TamanhosTitulo>
              <TamanhosGrid>
                {produto.tamanhos.map((tamanho) => (
                  <TamanhoBotao
                    key={tamanho.id}
                    $selecionado={tamanhoSelecionado === tamanho.nome}
                    onClick={() => setTamanhoSelecionado(tamanho.nome)}
                  >
                    {tamanho.nome}
                  </TamanhoBotao>
                ))}
              </TamanhosGrid>
            </TamanhosContainer>
          )}
          
          <BotaoAdicionar
            onClick={handleAdicionarCarrinho}
            disabled={adicionando || (produto.tamanhos && produto.tamanhos.length > 0 && !tamanhoSelecionado)}
          >
            {adicionando ? 'Adicionando...' : 'Adicionar ao Carrinho'}
          </BotaoAdicionar>
        </ConteudoContainer>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default ProdutoModal;