import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
  max-width: 1400px;
  margin: 3rem auto;
  padding: 0 1.5rem;
  
  @media (min-width: 768px) {
    padding: 0 2rem;
    margin: 4rem auto;
  }
`;

export const TituloContainer = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

export const Titulo = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--cor-texto);
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.5px;
  
  @media (min-width: 768px) {
    font-size: 2.2rem;
  }
`;

export const LinhaVermelha = styled.div`
  width: 60px;
  height: 3px;
  background: var(--cor-principal);
  margin: 0 auto;
  border-radius: 2px;
`;

export const CarouselContainer = styled.div`
  position: relative;
  
  .swiper-button-next,
  .swiper-button-prev {
    color: var(--cor-principal);
    width: 40px;
    height: 40px;
    background: var(--cor-card);
    border-radius: 50%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    top: 40%;
    
    &::after {
      font-size: 1.2rem;
      font-weight: bold;
    }
    
    &:hover {
      background: var(--cor-principal);
      color: white;
    }
    
    @media (max-width: 768px) {
      display: none; /* Esconde setas no mobile */
    }
  }
  
  .swiper-button-next {
    right: -10px;
    
    @media (min-width: 768px) {
      right: -20px;
    }
  }
  
  .swiper-button-prev {
    left: -10px;
    
    @media (min-width: 768px) {
      left: -20px;
    }
  }
  
  .swiper-button-disabled {
    opacity: 0.3;
    pointer-events: none;
  }
`;

export const CardProduto = styled.div`
  background: var(--cor-card);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

export const ImagemContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  
  @media (min-width: 768px) {
    height: 220px;
  }
  
  @media (min-width: 1024px) {
    height: 240px;
  }
`;

export const ImagemProduto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.5s ease;
  
  ${CardProduto}:hover & {
    transform: scale(1.05);
  }
`;

export const InfoProduto = styled.div`
  padding: 1.2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const NomeProduto = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: var(--cor-texto);
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
  flex: 1;
  
  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const MarcaProduto = styled.span`
  font-size: 0.85rem;
  color: var(--cor-principal);
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: block;
`;

export const PrecoProduto = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--cor-principal);
  margin: 0.5rem 0 1rem 0;
`;

export const BotaoAdicionar = styled.button`
  background: var(--cor-principal);
  color: white;
  border: none;
  padding: 0.7rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: auto;
  
  &:hover {
    background: var(--cor-principal-escura);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Estados
export const LoadingContainer = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--cor-texto);
  opacity: 0.7;
  font-size: 1.1rem;
`;

export const ErrorContainer = styled.div`
  text-align: center;
  padding: 3rem;
  color: #ff4444;
  background: #fff5f5;
  border-radius: 8px;
  font-size: 1.1rem;
`;

export const EmptyContainer = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--cor-texto);
  opacity: 0.7;
  font-size: 1.1rem;
`;