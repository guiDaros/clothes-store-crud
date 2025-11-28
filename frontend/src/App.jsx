import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Banner from './components/Banner';
import ProdutosDestaque from './components/ProdutosDestaque';
import ProdutosGrid from './components/ProdutosGrid';

const AppContainer = styled.div`
  font-family: 'Arial', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

function App() {
  return (
    <AppContainer>
      <Header />
      <Banner />
      <ProdutosDestaque />
      <ProdutosGrid />
    </AppContainer>
  );
}

export default App;