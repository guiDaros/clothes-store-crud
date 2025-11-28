import React, { useState } from 'react';
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
  BotaoFinalizar,
  CampoNome,
  FormGroup
} from './styles';
import { useCarrinho } from '../../context/CarrinhoContext';
import { apiService } from '../../services/api';

function Carrinho({ aberto, onFechar }) {
  const { 
    carrinho, 
    removerDoCarrinho, 
    atualizarQuantidade, 
    limparCarrinho, 
    totalPreco 
  } = useCarrinho();
  
  const [nomeCliente, setNomeCliente] = useState('');
  const [enviando, setEnviando] = useState(false);

  const gerarMensagemWhatsApp = () => {
    const itensTexto = carrinho.map(item => 
      `• ${item.nome} - R$ ${item.preco} x ${item.quantidade} = R$ ${(item.preco * item.quantidade).toFixed(2)}`
    ).join('\n');
    
    return `Olá! Gostaria de fazer um pedido:\n\n${itensTexto}\n\n*Total: R$ ${totalPreco.toFixed(2)}*\n\nCliente: ${nomeCliente || 'Não informado'}`;
  };

  const handleFinalizarPedido = async () => {
    if (!nomeCliente.trim()) {
      alert('Por favor, informe seu nome');
      return;
    }

    setEnviando(true);

    try {
      // 1. Salvar pedido no banco de dados
      const pedidoData = {
        nome_cliente: nomeCliente,
        itens: carrinho.map(item => ({
          id: item.id,
          nome: item.nome,
          preco: item.preco,
          quantidade: item.quantidade
        })),
        telefone: '' // Pode adicionar campo para telefone depois
      };

      await apiService.criarPedido(pedidoData);

      // 2. Gerar link do WhatsApp
      const mensagem = encodeURIComponent(gerarMensagemWhatsApp());
      const numeroWhatsApp = '5554999206402'; // Substitua pelo número da loja
      const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

      // 3. Abrir WhatsApp
      window.open(urlWhatsApp, '_blank');
      
      // 4. Limpar carrinho e fechar
      limparCarrinho();
      setNomeCliente('');
      onFechar();
      
      alert('Pedido enviado com sucesso! Verifique o WhatsApp.');

    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
      alert('Erro ao enviar pedido. Tente novamente.');
    } finally {
      setEnviando(false);
    }
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

        {carrinho.length > 0 && (
          <Rodape>
            <FormGroup>
              <label>Seu nome:</label>
              <CampoNome
                type="text"
                placeholder="Digite seu nome"
                value={nomeCliente}
                onChange={(e) => setNomeCliente(e.target.value)}
              />
            </FormGroup>
            
            <Total>
              <span>Total:</span>
              <span>R$ {totalPreco.toFixed(2)}</span>
            </Total>
            
            <BotaoFinalizar 
              onClick={handleFinalizarPedido}
              disabled={carrinho.length === 0 || enviando || !nomeCliente.trim()}
            >
              {enviando ? 'Enviando...' : 'Enviar para WhatsApp'}
            </BotaoFinalizar>
          </Rodape>
        )}
      </CarrinhoContainer>
    </>
  );
}

export default Carrinho;