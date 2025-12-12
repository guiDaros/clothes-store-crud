import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: ${props => props.$aberto ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
`;

export const ModalContainer = styled.div`
  background: var(--cor-card);
  border-radius: 16px;
  width: 90vw;
  height: 95vh;
  max-height: 95vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  
  @media (min-width: 768px) {
    width: 600px;
    height: auto;
    max-height: 85vh;
    max-width: 90vw;
    flex-direction: row;
  }
  
  @media (min-width: 1024px) {
    width: 800px;
    max-height: 80vh;
  }
`;

export const ModalFechar = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

export const ImagemContainer = styled.div`
  flex: 1;
  min-height: 300px;
  max-height: 50vh;
  overflow: hidden;
  position: relative;
  
  @media (min-width: 768px) {
    min-height: 500px;
    max-height: 100%;
    max-width: 50%;
    flex: 1;
  }
`;

export const ImagemProduto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const ConteudoContainer = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) {
    max-width: 50%;
    padding: 2.5rem;
  }
`;

export const TituloProduto = styled.h2`
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  color: var(--cor-texto);
  line-height: 1.3;
  
  @media (min-width: 768px) {
    font-size: 1.8rem;
  }
  
  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`;

export const MarcaProduto = styled.span`
  display: block;
  font-size: 0.9rem;
  color: var(--cor-principal);
  margin-bottom: 1.5rem;
  font-weight: 500;
  
  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

export const DescricaoProduto = styled.p`
  color: var(--cor-texto);
  line-height: 1.6;
  margin: 1.5rem 0;
  opacity: 0.8;
  font-size: 0.95rem;
  flex: 1;
  
  @media (min-width: 768px) {
    font-size: 1rem;
    margin: 2rem 0;
  }
`;

export const PrecoProduto = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--cor-principal);
  margin: 1.5rem 0;
  
  @media (min-width: 768px) {
    font-size: 2rem;
    margin: 1rem 0 1.5rem 0;
  }
`;

export const TamanhosContainer = styled.div`
  margin: 1.5rem 0 2rem 0;
`;

export const TamanhosTitulo = styled.h3`
  font-size: 1.1rem;
  margin: 0 0 1rem 0;
  color: var(--cor-texto);
  font-weight: 600;
`;

export const TamanhosGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const TamanhoBotao = styled.button`
  padding: 0.8rem 1.5rem;
  border: 2px solid ${props => props.$selecionado ? 'var(--cor-principal)' : 'var(--cor-borda)'};
  background: ${props => props.$selecionado ? 'var(--cor-principal)' : 'transparent'};
  color: ${props => props.$selecionado ? 'white' : 'var(--cor-texto)'};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  
  &:hover {
    border-color: var(--cor-principal);
    background: ${props => props.$selecionado ? 'var(--cor-principal)' : 'var(--cor-principal-clara)'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: var(--cor-borda);
    background: transparent;
  }
`;

export const BotaoAdicionar = styled.button`
  background: var(--cor-principal);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;
  margin-top: auto;
  
  &:hover {
    background: var(--cor-principal-escura);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: var(--cor-borda);
    color: var(--cor-texto);
    cursor: not-allowed;
    transform: none;
  }
  
  @media (min-width: 768px) {
    padding: 1.2rem 2rem;
    font-size: 1.2rem;
  }
`;