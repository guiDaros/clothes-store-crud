import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.aberto ? 'block' : 'none'};
  z-index: 1000;
`;

export const CarrinhoContainer = styled.div`
  position: fixed;
  top: 0;
  right: ${props => props.aberto ? '0' : '-400px'};
  width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  z-index: 1001;
  display: flex;
  flex-direction: column;
`;

export const Cabecalho = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Titulo = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

export const BotaoFechar = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
`;

export const ListaProdutos = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

export const ItemCarrinho = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
`;

export const ImagemProduto = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 1rem;
`;

export const InfoProduto = styled.div`
  flex: 1;
`;

export const NomeProduto = styled.h4`
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
`;

export const PrecoProduto = styled.p`
  margin: 0;
  color: #2c5aa0;
  font-weight: bold;
`;

export const ControleQuantidade = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const BotaoQuantidade = styled.button`
  background: #f0f0f0;
  border: 1px solid #ddd;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: #e0e0e0;
  }
`;

export const Quantidade = styled.span`
  padding: 0 0.5rem;
`;

export const BotaoRemover = styled.button`
  background: #ff4444;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  
  &:hover {
    background: #cc0000;
  }
`;

export const Rodape = styled.div`
  padding: 1rem;
  border-top: 1px solid #eee;
`;

export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const BotaoFinalizar = styled.button`
  background: #2c5aa0;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 1.1rem;
  
  &:hover {
    background: #1e3d6f;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

// Adicione estas linhas no final do arquivo styles.js
export const FormGroup = styled.div`
  margin-bottom: 1rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
`;

export const CampoNome = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #2c5aa0;
  }
`;