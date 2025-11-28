import React from 'react';
import { HeaderContainer, Logo, Icon } from './styles';

function Header() {
  return (
    <HeaderContainer>
      <Icon>☰</Icon>
      <Logo>Minha Loja</Logo>
      <div>
        <Icon>🔍</Icon>
        <Icon>🛒</Icon>
      </div>
    </HeaderContainer>
  );
}

export default Header;