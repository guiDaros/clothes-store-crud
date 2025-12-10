import styled from 'styled-components';

export const BannerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background: var(--cor-fundo);
  
  /* Estilos do Swiper */
  .swiper {
    width: 100%;
    max-width: 100vw;
  }
  
  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const LoadingContainer = styled.div`
  width: 100%;
  max-width: 100vw;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--cor-borda);
  color: var(--cor-texto);
  opacity: 0.7;
  font-size: 1rem;
  
  @media (min-width: 768px) {
    height: 350px;
    font-size: 1.1rem;
  }
`;

export const ErrorContainer = styled.div`
  width: 100%;
  max-width: 100vw;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff5f5;
  color: #cc0000;
  font-size: 1rem;
  
  @media (min-width: 768px) {
    height: 350px;
  }
`;