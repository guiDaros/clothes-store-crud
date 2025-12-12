import React, { useState } from 'react';
import {
  DropdownContainer,
  DropdownTrigger,
  DropdownMenu,
  ParentLink,
  Divider,
  SubDropdownMenu,
  SubDropdownMenuItem,
  ArrowIcon
} from './DropdownCategoriasStyles';

const DropdownCategorias = ({ 
  categoria, 
  onSelecionarCategoria,
  isMobile = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Para mobile: toggle no click
  // Para desktop: hover abre, mouse leave fecha
  const handleToggle = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsOpen(false);
    }
  };

  // Renderiza subcategorias recursivamente (até 3 níveis)
  const renderSubcategorias = (subcategorias, nivel = 1) => {
    if (!subcategorias || subcategorias.length === 0) return null;

    return (
      <SubDropdownMenu $nivel={nivel}>
        {subcategorias.map((subcat) => (
          <div key={subcat.id}>
            <SubDropdownMenuItem
              $hasChildren={subcat.subcategorias && subcat.subcategorias.length > 0}
              $isMobile={isMobile}
              onClick={(e) => {
                e.stopPropagation();
                onSelecionarCategoria(subcat.id);
              }}
            >
              <span>{subcat.nome}</span>
              {subcat.subcategorias && subcat.subcategorias.length > 0 && (
                <ArrowIcon $isOpen={false}>›</ArrowIcon>
              )}
            </SubDropdownMenuItem>
            
            {/* Sub-subcategorias (nível 3) */}
            {renderSubcategorias(subcat.subcategorias, nivel + 1)}
          </div>
        ))}
      </SubDropdownMenu>
    );
  };

  return (
    <DropdownContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <DropdownTrigger
        onClick={isMobile ? handleToggle : undefined}
        $isActive={isOpen}
        $isMobile={isMobile}
      >
        <span onClick={() => onSelecionarCategoria(categoria.id)}>
          {categoria.nome}
        </span>
        {categoria.subcategorias && categoria.subcategorias.length > 0 && (
          <ArrowIcon $isOpen={isOpen}>▼</ArrowIcon>
        )}
      </DropdownTrigger>

      {isOpen && categoria.subcategorias && categoria.subcategorias.length > 0 && (
        <DropdownMenu $isMobile={isMobile}>
          {/* CATEGORIA PAI CLICÁVEL (seu requisito importante) */}
          <ParentLink
            $isMobile={isMobile}
            onClick={() => onSelecionarCategoria(categoria.id)}
          >
            Ver todos em "{categoria.nome}"
          </ParentLink>

          <Divider $isMobile={isMobile} />

          {/* SUB-CATEGORIAS (níveis 2 e 3) */}
          {renderSubcategorias(categoria.subcategorias)}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default DropdownCategorias;