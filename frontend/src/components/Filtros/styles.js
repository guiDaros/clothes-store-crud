import styled from 'styled-components';

export const FiltrosContainer = styled.div`
  margin: 2rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
`;

export const TituloFiltros = styled.h3`
  margin: 0 0 1rem 0;
  color: #333;
`;

export const FiltrosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

export const GrupoFiltro = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #2c5aa0;
  }
`;

export const Option = styled.option`
  padding: 0.5rem;
`;

export const BotaoLimpar = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  
  &:hover {
    background: #5a6268;
  }
`;