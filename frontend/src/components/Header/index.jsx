import React, { useState } from 'react';
import { HeaderContainer, Logo, Icon } from './styles';
import { useCarrinho } from '../../context/CarrinhoContext';
import Carrinho from '../Carrinho';

function Header() {
  const { totalItens } = useCarrinho();
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  return (
    <>
      <HeaderContainer>
        <Icon>☰</Icon>
        <Logo>Minha Loja</Logo>
        <div>
          <Icon>🔍</Icon>
          <Icon onClick={() => setCarrinhoAberto(true)}>
            🛒 {totalItens > 0 && `(${totalItens})`}
          </Icon>
        </div>
      </HeaderContainer>
      
      <Carrinho 
        aberto={carrinhoAberto} 
        onFechar={() => setCarrinhoAberto(false)} 
      />
    </>
  );
}

export default Header;