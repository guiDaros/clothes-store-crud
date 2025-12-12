import React, { useState } from "react";
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
  DesktopIcons,
} from "./styles";
import { useCarrinho } from "../../context/CarrinhoContext";
import { useTema } from "../../context/TemaContext";
import { useCategorias } from "../../hooks/useCategorias";
import Carrinho from "../Carrinho";
import MenuCategorias from "../MenuCategorias";
import DropdownCategorias from "./DropdownCategorias";

function Header() {
  const { totalItens } = useCarrinho();
  const { configuracao } = useTema();
  const { categoriasHierarquia, loading } = useCategorias(); // ← loading adicionado
  const [menuAberto, setMenuAberto] = useState(false);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  const handleSelecionarCategoria = (categoriaId) => {
    if (categoriaId === null) {
      window.location.href = "/produtos"; // Todos os produtos
    } else {
      window.location.href = `/produtos?categoria=${categoriaId}`;
    }

    // Opção 2: Se estiver usando React Router
    // const navigate = useNavigate();
    // if (categoriaId === null) {
    //   navigate('/produtos');
    // } else {
    //   navigate(`/produtos?categoria=${categoriaId}`);
    // }
  };

  return (
    <>
      <HeaderContainer>
        {configuracao.logo_url ? (
          <LogoImagem src={configuracao.logo_url} alt="Logo" />
        ) : (
          <Logo style={{ color: "var(--cor-principal)" }}>MINHA LOJA</Logo>
        )}

        <DesktopMenu>
          {!loading && categoriasHierarquia.length > 0 ? (
            // RENDERIZAÇÃO COM DROPDOWN
            categoriasHierarquia.map((categoria) => {
              // "Todos" sem dropdown
              // Substitua o bloco do "Todos" por:
              if (categoria.id === null) {
                return (
                  <a
                    key="todos"
                    href="/produtos"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelecionarCategoria(null);
                    }}
                    style={{
                      color: "var(--cor-texto)", // COR NORMAL
                      fontWeight: "500", // PESO NORMAL
                      textDecoration: "none",
                      padding: "0.5rem 1rem",
                      fontSize: "0.95rem",
                    }}
                  >
                    Todos
                  </a>
                );
              }

              // Categorias com dropdown
              return (
                <DropdownCategorias
                  key={categoria.id}
                  categoria={categoria}
                  onSelecionarCategoria={handleSelecionarCategoria}
                  isMobile={false}
                />
              );
            })
          ) : (
            // Loading state
            <div style={{ padding: "0.5rem 1rem", color: "var(--cor-texto)" }}>
              Carregando...
            </div>
          )}
        </DesktopMenu>

        <IconGroup>
          <DesktopIcons>
            <IconButton onClick={() => setCarrinhoAberto(true)}>
              <CartIcon>
                🛒
                {totalItens > 0 && (
                  <CartBadge style={{ background: "var(--cor-principal)" }}>
                    {totalItens}
                  </CartBadge>
                )}
              </CartIcon>
            </IconButton>
          </DesktopIcons>

          <IconButton
            onClick={() => setMenuAberto(true)}
            style={{ display: "block" }}
            className="mobile-only"
          >
            <MenuIcon>
              <span style={{ background: "var(--cor-texto)" }}></span>
              <span style={{ background: "var(--cor-texto)" }}></span>
              <span style={{ background: "var(--cor-texto)" }}></span>
            </MenuIcon>
          </IconButton>
        </IconGroup>
      </HeaderContainer>

      {/* Menu Lateral Mobile */}
      <MenuOverlay $aberto={menuAberto} onClick={() => setMenuAberto(false)} />
      <MenuLateral
        $aberto={menuAberto}
        style={{ background: "var(--cor-card)" }}
      >
        <MenuCabecalho style={{ borderBottom: "1px solid var(--cor-borda)" }}>
          <MenuFechar
            onClick={() => setMenuAberto(false)}
            style={{ color: "var(--cor-texto)" }}
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
