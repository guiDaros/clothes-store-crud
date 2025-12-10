import React, { useState } from 'react';
import { 
  HeaderContainer,
  Logo,
  LogoImagem,
  IconGroup,
  IconButton,
  MenuIcon,
  CartIcon,
  CartBadge,
  MenuOverlay,
  MenuLateral,
  MenuCabecalho,
  MenuFechar,
  MenuItens,
  DesktopMenu,
  DesktopMenuItem,
  DesktopIcons
} from './styles';
import { useCarrinho } from '../../context/CarrinhoContext';
import { useTema } from '../../context/TemaContext';
import { useCategorias } from '../../hooks/useCategorias';
import Carrinho from '../Carrinho';
import MenuCategorias from '../MenuCategorias';

function Header() {
  const { totalItens } = useCarrinho();
  const { configuracao } = useTema();
  const { categoriasHierarquia } = useCategorias();
  const [menuAberto, setMenuAberto] = useState(false);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  const handleSelecionarCategoria = (categoriaId) => {
    setCategoriaSelecionada(categoriaId);
    // Aqui você pode navegar para a página de produtos filtrados
    console.log('Categoria selecionada:', categoriaId);
  };

  // Para desktop: pega apenas categorias principais
  const categoriasPrincipais = categoriasHierarquia
    .filter(cat => !cat.parent)
    .slice(0, 6); // Limita a 6 para não ficar muito largo

  return (
    <>
      <HeaderContainer>
        {configuracao.logo_url ? (
          <LogoImagem src={configuracao.logo_url} alt="Logo" />
        ) : (
          <Logo style={{ color: 'var(--cor-principal)' }}>MINHA LOJA</Logo>
        )}
        
        <DesktopMenu>
          <DesktopMenuItem 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleSelecionarCategoria(null);
            }}
          >
            Todos
          </DesktopMenuItem>
          {categoriasPrincipais.map((categoria) => (
            <DesktopMenuItem 
              key={categoria.id}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleSelecionarCategoria(categoria.id);
              }}
              style={{
                color: categoriaSelecionada === categoria.id 
                  ? 'var(--cor-principal)' 
                  : 'var(--cor-texto)',
                fontWeight: categoriaSelecionada === categoria.id ? '600' : '500'
              }}
            >
              {categoria.nome}
            </DesktopMenuItem>
          ))}
        </DesktopMenu>
        
        <IconGroup>
          <DesktopIcons>
            <IconButton onClick={() => setCarrinhoAberto(true)}>
              <CartIcon>
                🛒
                {totalItens > 0 && (
                  <CartBadge style={{ background: 'var(--cor-principal)' }}>
                    {totalItens}
                  </CartBadge>
                )}
              </CartIcon>
            </IconButton>
          </DesktopIcons>
          
          <IconButton 
            onClick={() => setMenuAberto(true)}
            style={{ display: 'block' }}
            className="mobile-only"
          >
            <MenuIcon>
              <span style={{ background: 'var(--cor-texto)' }}></span>
              <span style={{ background: 'var(--cor-texto)' }}></span>
              <span style={{ background: 'var(--cor-texto)' }}></span>
            </MenuIcon>
          </IconButton>
        </IconGroup>
      </HeaderContainer>

      {/* Menu Lateral Mobile */}
      <MenuOverlay $aberto={menuAberto} onClick={() => setMenuAberto(false)} />
      <MenuLateral $aberto={menuAberto} style={{ background: 'var(--cor-card)' }}>
        <MenuCabecalho style={{ borderBottom: '1px solid var(--cor-borda)' }}>
          <MenuFechar 
            onClick={() => setMenuAberto(false)}
            style={{ color: 'var(--cor-texto)' }}
          >
            ×
          </MenuFechar>
        </MenuCabecalho>
        
        <MenuItens>
          <MenuCategorias 
            onSelecionarCategoria={(id) => {
              handleSelecionarCategoria(id);
              setMenuAberto(false);
            }}
            onFechar={() => setMenuAberto(false)}
          />
        </MenuItens>
      </MenuLateral>

      {/* Carrinho */}
      <Carrinho 
        aberto={carrinhoAberto} 
        onFechar={() => setCarrinhoAberto(false)} 
      />
    </>
  );
}

export default Header;