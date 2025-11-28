import styled from 'styled-components';

export const Container = styled.section`
  margin: 3rem 0;
`;

export const Titulo = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

export const ListaProdutos = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 1rem 0;
`;

export const ProdutoCard = styled.div`
  min-width: 200px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
`;

export const ProdutoImagem = styled.div`
  height: 150px;
  background: #f0f0f0;
  border-radius: 4px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
`;

export const ProdutoNome = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

export const ProdutoPreco = styled.p`
  font-weight: bold;
  color: #2c5aa0;
`;