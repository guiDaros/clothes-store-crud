import styled from 'styled-components';

export const Container = styled.section`
  margin: 3rem 0;
`;

export const Titulo = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

export const ProdutoCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
`;

export const ProdutoImagem = styled.div`
  height: 200px;
  background: #f0f0f0;
  border-radius: 4px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
`;

export const ProdutoNome = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

export const ProdutoPreco = styled.p`
  font-weight: bold;
  color: #2c5aa0;
  margin-bottom: 1rem;
`;

export const BotaoAdicionar = styled.button`
  background: #2c5aa0;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background: #1e3d6f;
  }
`;