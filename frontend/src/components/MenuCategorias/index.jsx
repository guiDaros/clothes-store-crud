import React, { useState } from 'react';
import styled from 'styled-components';
import { useCategorias } from '../../hooks/useCategorias';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoriaItem = styled.div`
  cursor: pointer;
  user-select: none;
`;

const CategoriaTitulo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  color: var(--cor-texto);
  font-size: 1.1rem;
  border-bottom: 1px solid var(--cor-borda);
  transition: background-color 0.2s;
  
  &:hover {
    background-color: var(--cor-principal-clara);
    color: var(--cor-principal);
  }
  
  &.ativa {
    background-color: var(--cor-principal-clara);
    color: var(--cor-principal);
    font-weight: 600;
  }
`;

const Seta = styled.span`
  font-size: 1.2rem;
  transition: transform 0.3s;
  transform: ${props => props.$aberta ? 'rotate(90deg)' : 'rotate(0deg)'};
`;

const SubcategoriasContainer = styled.div`
  background-color: var(--cor-fundo);
  border-bottom: 1px solid var(--cor-borda);
  max-height: ${props => props.$aberta ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const SubcategoriaItem = styled.a`
  display: block;
  padding: 0.75rem 1.5rem 0.75rem 2.5rem;
  color: var(--cor-texto);
  text-decoration: none;
  font-size: 1rem;
  border-bottom: 1px solid var(--cor-borda);
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: var(--cor-principal-clara);
    color: var(--cor-principal);
  }
  
  &.sub-subcategoria {
    padding-left: 3.5rem;
    font-size: 0.95rem;
    color: var(--cor-texto);
    opacity: 0.9;
  }
`;

const LinkCategoria = styled.a`
  display: block;
  padding: 1rem 1.5rem;
  color: var(--cor-texto);
  text-decoration: none;
  font-size: 1.1rem;
  border-bottom: 1px solid var(--cor-borda);
  
  &:hover {
    background-color: var(--cor-principal-clara);
    color: var(--cor-principal);
  }
`;

function MenuCategorias({ onSelecionarCategoria, onFechar }) {
  const { categoriasHierarquia, loading, error } = useCategorias();
  const [categoriaAberta, setCategoriaAberta] = useState(null);

  const toggleCategoria = (categoriaId) => {
    setCategoriaAberta(categoriaAberta === categoriaId ? null : categoriaId);
  };

  const handleCategoriaClick = (categoria) => {
    if (categoria.subcategorias && categoria.subcategorias.length > 0) {
      toggleCategoria(categoria.id);
    } else {
      onSelecionarCategoria(categoria.id);
      onFechar && onFechar();
    }
  };

  const renderSubcategorias = (subcategorias, nivel = 1) => {
    return subcategorias.map(subcat => (
      <React.Fragment key={subcat.id}>
        {subcat.subcategorias && subcat.subcategorias.length > 0 ? (
          <>
            <CategoriaTitulo 
              onClick={() => toggleCategoria(subcat.id)}
              className={categoriaAberta === subcat.id ? 'ativa' : ''}
              style={{ paddingLeft: `${1.5 + (nivel * 1)}rem` }}
            >
              {subcat.nome}
              <Seta $aberta={categoriaAberta === subcat.id}>›</Seta>
            </CategoriaTitulo>
            <SubcategoriasContainer $aberta={categoriaAberta === subcat.id}>
              {renderSubcategorias(subcat.subcategorias, nivel + 1)}
            </SubcategoriasContainer>
          </>
        ) : (
          <SubcategoriaItem 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSelecionarCategoria(subcat.id);
              onFechar && onFechar();
            }}
            className={nivel > 1 ? 'sub-subcategoria' : ''}
            style={{ paddingLeft: `${1.5 + (nivel * 1)}rem` }}
          >
            {subcat.nome}
          </SubcategoriaItem>
        )}
      </React.Fragment>
    ));
  };

  if (loading) {
    return <div style={{ padding: '1.5rem', color: 'var(--cor-texto)' }}>Carregando categorias...</div>;
  }

  if (error) {
    return <div style={{ padding: '1.5rem', color: 'red' }}>Erro: {error}</div>;
  }

  if (categoriasHierarquia.length === 0) {
    return <div style={{ padding: '1.5rem', color: 'var(--cor-texto)' }}>Nenhuma categoria cadastrada</div>;
  }

  return (
    <MenuContainer>
      <LinkCategoria 
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onSelecionarCategoria(null);
          onFechar && onFechar();
        }}
      >
        Todas as Categorias
      </LinkCategoria>
      
      {categoriasHierarquia.map(categoria => (
        <CategoriaItem key={categoria.id}>
          <CategoriaTitulo 
            onClick={() => handleCategoriaClick(categoria)}
            className={categoriaAberta === categoria.id ? 'ativa' : ''}
          >
            {categoria.nome}
            {categoria.subcategorias && categoria.subcategorias.length > 0 && (
              <Seta $aberta={categoriaAberta === categoria.id}>›</Seta>
            )}
          </CategoriaTitulo>
          
          {categoria.subcategorias && categoria.subcategorias.length > 0 && (
            <SubcategoriasContainer $aberta={categoriaAberta === categoria.id}>
              {renderSubcategorias(categoria.subcategorias)}
            </SubcategoriasContainer>
          )}
        </CategoriaItem>
      ))}
    </MenuContainer>
  );
}

export default MenuCategorias;