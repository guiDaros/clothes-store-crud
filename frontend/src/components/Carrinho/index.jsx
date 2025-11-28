import React from 'react';
import { 
  Overlay, 
  CarrinhoContainer, 
  Cabecalho, 
  Titulo, 
  BotaoFechar,
  ListaProdutos,
  ItemCarrinho,
  ImagemProduto,
  InfoProduto,
  NomeProduto,
  PrecoProduto,
  ControleQuantidade,
  BotaoQuantidade,
  Quantidade,
  BotaoRemover,
  Rodape,
  Total,
  BotaoFinalizar
} from './styles';
import { useCarrinho } from '../../context/CarrinhoContext';

function Carrinho({ aberto, onFechar }) {
  const { 
    carrinho, 
    removerDoCarrinho, 
    atualizarQuantidade, 
    limparCarrinho, 
    totalPreco 
  } = useCarrinho();

  const handleFinalizarPedido = () => {
    // TODO: Implementar envio para WhatsApp
    alert('Funcionalidade de WhatsApp em breve!');
  };

  if (!aberto) return null;

  return (
    <>
      <Overlay aberto={aberto} onClick={onFechar} />
      <CarrinhoContainer aberto={aberto}>
        <Cabecalho>
          <Titulo>Meu Carrinho</Titulo>
          <BotaoFechar onClick={onFechar}>×</BotaoFechar>
        </Cabecalho>

        <ListaProdutos>
          {carrinho.length === 0 ? (
            <p>Carrinho vazio</p>
          ) : (
            carrinho.map(item => (
              <ItemCarrinho key={item.id}>
                {item.imagem && (
                  <ImagemProduto src={item.imagem} alt={item.nome} />
                )}
                <InfoProduto>
                  <NomeProduto>{item.nome}</NomeProduto>
                  <PrecoProduto>R$ {item.preco}</PrecoProduto>
                  <ControleQuantidade>
                    <BotaoQuantidade 
                      onClick={() => atualizarQuantidade(item.id, Math.max(1, item.quantidade - 1))}
                    >
                      -
                    </BotaoQuantidade>
                    <Quantidade>{item.quantidade}</Quantidade>
                    <BotaoQuantidade 
                      onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                    >
                      +
                    </BotaoQuantidade>
                  </ControleQuantidade>
                  <BotaoRemover onClick={() => removerDoCarrinho(item.id)}>
                    Remover
                  </BotaoRemover>
                </InfoProduto>
              </ItemCarrinho>
            ))
          )}
        </ListaProdutos>

        <Rodape>
          <Total>
            <span>Total:</span>
            <span>R$ {totalPreco.toFixed(2)}</span>
          </Total>
          <BotaoFinalizar 
            onClick={handleFinalizarPedido}
            disabled={carrinho.length === 0}
          >
            Finalizar Pedido
          </BotaoFinalizar>
        </Rodape>
      </CarrinhoContainer>
    </>
  );
}

export default Carrinho;