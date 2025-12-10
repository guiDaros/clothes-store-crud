// import styled from 'styled-components';

// export const HeaderContainer = styled.header`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 1rem 1.5rem;
//   background: white;
//   border-bottom: 1px solid #e5e5e5;
//   position: sticky;
//   top: 0;
//   z-index: 100;
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  
//   @media (min-width: 768px) {
//     padding: 1rem 3rem;
//   }
// `;

// export const Logo = styled.h1`
//   font-size: 1.5rem;
//   font-weight: 700;
//   margin: 0;
//   color: #111;
//   letter-spacing: -0.5px;
  
//   @media (min-width: 768px) {
//     font-size: 1.8rem;
//   }
// `;

// export const IconGroup = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1.5rem;
// `;

// export const IconButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   position: relative;
//   padding: 0.5rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// export const MenuIcon = styled.div`
//   width: 24px;
//   height: 20px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
  
//   span {
//     height: 2px;
//     width: 100%;
//     background: #111;
//     border-radius: 1px;
//     transition: all 0.3s ease;
//   }
// `;

// export const CartIcon = styled.div`
//   font-size: 1.5rem;
//   position: relative;
// `;

// export const CartBadge = styled.div`
//   position: absolute;
//   top: -8px;
//   right: -8px;
//   background: #ff4444;
//   color: white;
//   font-size: 0.7rem;
//   min-width: 18px;
//   height: 18px;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-weight: bold;
// `;

// // Menu Lateral
// export const MenuOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background: rgba(0, 0, 0, 0.5);
//   z-index: 999;
//   display: ${props => props.$aberto ? 'block' : 'none'};
// `;

// export const MenuLateral = styled.div`
//   position: fixed;
//   top: 0;
//   right: ${props => props.$aberto ? '0' : '-66.666%'};
//   width: 66.666%;
//   max-width: 300px;
//   height: 100vh;
//   background: white;
//   z-index: 1000;
//   transition: right 0.3s ease;
//   box-shadow: -2px 0 20px rgba(0, 0, 0, 0.1);
//   display: flex;
//   flex-direction: column;
// `;

// export const MenuCabecalho = styled.div`
//   padding: 1.5rem;
//   border-bottom: 1px solid #e5e5e5;
//   display: flex;
//   justify-content: flex-end;
// `;

// export const MenuFechar = styled.button`
//   background: none;
//   border: none;
//   font-size: 1.5rem;
//   cursor: pointer;
//   padding: 0.5rem;
// `;

// export const MenuItens = styled.div`
//   flex: 1;
//   overflow-y: auto;
//   padding: 1rem 0;
// `;

// export const MenuItem = styled.a`
//   display: block;
//   padding: 1rem 1.5rem;
//   color: #333;
//   text-decoration: none;
//   font-size: 1.1rem;
//   border-bottom: 1px solid #f5f5f5;
  
//   &:hover {
//     background: #f9f9f9;
//     color: #111;
//   }
  
//   &:last-child {
//     border-bottom: none;
//   }
// `;

// export const LogoImagem = styled.img`
//   height: 40px;
//   width: auto;
//   max-width: 150px;
//   object-fit: contain;
  
//   @media (min-width: 768px) {
//     height: 45px;
//   }
// `;

import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: var(--cor-card);
  border-bottom: 1px solid var(--cor-borda);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--sombra);
  
  @media (min-width: 768px) {
    padding: 1rem 3rem;
  }
`;

export const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: var(--cor-principal);
  letter-spacing: -0.5px;
  
  @media (min-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const LogoImagem = styled.img`
  height: 40px;
  width: auto;
  max-width: 150px;
  object-fit: contain;
  
  @media (min-width: 768px) {
    height: 45px;
  }
`;

export const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MenuIcon = styled.div`
  width: 24px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  span {
    height: 2px;
    width: 100%;
    background: var(--cor-texto);
    border-radius: 1px;
    transition: all 0.3s ease;
  }
`;

export const CartIcon = styled.div`
  font-size: 1.5rem;
  position: relative;
  color: var(--cor-texto);
`;

export const CartBadge = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--cor-principal);
  color: white;
  font-size: 0.7rem;
  min-width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

// Menu Desktop - ADICIONE ESTAS EXPORTAÇÕES
export const DesktopMenu = styled.div`
  display: none;
  
  @media (min-width: 768px) {
    display: flex;
    gap: 2rem;
    margin: 0 auto;
  }
`;

export const DesktopMenuItem = styled.a`
  color: var(--cor-texto);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.5rem;
  
  &:hover {
    color: var(--cor-principal);
  }
`;

export const DesktopIcons = styled.div`
  display: none;
  
  @media (min-width: 768px) {
    display: flex;
    gap: 1.5rem;
  }
`;

// Menu Lateral
export const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${props => props.$aberto ? 'block' : 'none'};
`;

export const MenuLateral = styled.div`
  position: fixed;
  top: 0;
  right: ${props => props.$aberto ? '0' : '-66.666%'};
  width: 66.666%;
  max-width: 300px;
  height: 100vh;
  background: var(--cor-card);
  z-index: 1000;
  transition: right 0.3s ease;
  box-shadow: -2px 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

export const MenuCabecalho = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid var(--cor-borda);
  display: flex;
  justify-content: flex-end;
`;

export const MenuFechar = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  color: var(--cor-texto);
`;

export const MenuItens = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
`;

export const MenuItem = styled.a`
  display: block;
  padding: 1rem 1.5rem;
  color: var(--cor-texto);
  text-decoration: none;
  font-size: 1.1rem;
  border-bottom: 1px solid var(--cor-borda);
  
  &:hover {
    background: var(--cor-principal-clara);
    color: var(--cor-principal);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;