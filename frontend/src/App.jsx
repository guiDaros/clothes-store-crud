import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Banner from './components/Banner';
import ProdutosDestaque from './components/ProdutosDestaque';
import ProdutosGrid from './components/ProdutosGrid';

const AppContainer = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  min-height: 100vh;
  background: #ffffff;
`;

const Conteudo = styled.div`
  max-width: 100%;
  
  @media (min-width: 768px) {
    max-width: 1200px;
    margin: 0 auto;
  }
`;

function App() {
  return (
    <AppContainer>
      <Header />
      <Conteudo>
        <Banner />
        <ProdutosDestaque />
        <ProdutosGrid />
      </Conteudo>
    </AppContainer>
  );
}

export default App;