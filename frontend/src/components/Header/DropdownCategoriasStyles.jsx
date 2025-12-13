import styled from 'styled-components';

// Container principal do dropdown
export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

// Trigger (categoria pai no header)
export const DropdownTrigger = styled.div`
  color: var(--cor-texto);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    color: var(--cor-principal);
  }
  
  ${props => props.$isActive && `
    color: var(--cor-principal);
    font-weight: 600;
  `}
  
  ${props => props.$isMobile && `
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--cor-borda);
    width: 100%;
    justify-content: space-between;
  `}
`;

// Menu dropdown principal
export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--cor-card);
  min-width: 220px;
  max-width: 280px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  border: 1px solid var(--cor-borda);
  z-index: 1100;
  padding: 12px 0;
  margin-top: 8px;
  
  ${props => props.$isMobile && `
    position: static;
    transform: none;
    box-shadow: none;
    border: none;
    border-radius: 0;
    width: 100%;
    max-width: none;
    background: var(--cor-principal-clara);
    margin-top: 0;
    padding: 0;
  `}
`;

// Item do menu (subcategoria nível 1)
export const DropdownMenuItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--cor-texto);
  font-size: 0.9rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--cor-principal-clara);
    color: var(--cor-principal);
  }
`;

// Link da categoria pai (sempre clicável)
export const ParentLink = styled(DropdownMenuItem)`
  font-weight: 600;
  color: var(--cor-principal);
  border-bottom: 1px solid var(--cor-borda);
  margin-bottom: 8px;
  padding-bottom: 12px;
  
  &:hover {
    background: var(--cor-principal-clara);
  }
`;

// Menu de subcategorias (níveis 2+)
export const SubDropdownMenu = styled.div`
  background: ${props => props.$nivel === 2 
    ? 'var(--cor-principal-clara)' 
    : 'var(--cor-card)'};
  border-left: ${props => props.$nivel >= 2 
    ? '2px solid var(--cor-principal)' 
    : 'none'};
  margin-left: ${props => props.$nivel >= 2 ? '10px' : '0'};
`;

// Item de subcategoria
export const SubDropdownMenuItem = styled.div`
  padding: ${props => props.$isMobile ? '12px 24px' : '8px 20px'};
  padding-left: ${props => props.$hasChildren ? '16px' : '20px'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--cor-texto);
  font-size: ${props => props.$isMobile ? '1rem' : '0.85rem'};
  transition: all 0.2s ease;
  border-bottom: ${props => props.$isMobile ? '1px solid var(--cor-borda)' : 'none'};
  
  &:hover {
    background: var(--cor-principal-clara);
    color: var(--cor-principal);
  }
`;

// Divisor
export const Divider = styled.hr`
  border: none;
  height: 1px;
  background: var(--cor-borda);
  margin: 8px 20px;
`;

// Ícone de seta
export const ArrowIcon = styled.span`
  font-size: 0.7rem;
  transition: transform 0.3s ease;
  transform: rotate(${props => props.$isOpen ? '180deg' : '0deg'});
  margin-left: 4px;
`;