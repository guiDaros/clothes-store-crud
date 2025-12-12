import React, { useState, useRef, useEffect } from 'react';
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
  const dropdownRef = useRef(null);
  let timeoutId = null;

  // Para mobile: toggle no click
  const handleToggle = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  // Para desktop: hover com delay para fechar
  const handleMouseEnter = () => {
    if (!isMobile) {
      clearTimeout(timeoutId);
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      // Delay de 300ms para fechar (permite mover mouse entre categorias)
      timeoutId = setTimeout(() => {
        if (dropdownRef.current && 
            !dropdownRef.current.matches(':hover')) {
          setIsOpen(false);
        }
      }, 300);
    }
  };

  // Cleanup do timeout
  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Renderiza subcategorias
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
            {renderSubcategorias(subcat.subcategorias, nivel + 1)}
          </div>
        ))}
      </SubDropdownMenu>
    );
  };

  return (
    <DropdownContainer
      ref={dropdownRef}
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
        <DropdownMenu 
          $isMobile={isMobile}
          onMouseEnter={handleMouseEnter}  // IMPORTANTE: mantém aberto
          onMouseLeave={handleMouseLeave}
        >
          <ParentLink
            $isMobile={isMobile}
            onClick={() => onSelecionarCategoria(categoria.id)}
          >
            Ver todos em "{categoria.nome}"
          </ParentLink>

          <Divider $isMobile={isMobile} />

          {renderSubcategorias(categoria.subcategorias)}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default DropdownCategorias;