import React, { createContext, useContext, useReducer } from 'react';

const CarrinhoContext = createContext();

const carrinhoReducer = (state, action) => {
  switch (action.type) {
    case 'ADICIONAR_PRODUTO': {
      const produtoComIdUnico = action.produto.tamanho 
        ? `${action.produto.id}-${action.produto.tamanho}`
        : action.produto.id.toString();
      
      const existingItem = state.find(item => item.idUnico === produtoComIdUnico);
      
      if (existingItem) {
        return state.map(item =>
          item.idUnico === produtoComIdUnico
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      
      return [...state, { 
        ...action.produto, 
        idUnico: produtoComIdUnico,
        quantidade: 1 
      }];
    }
      
    case 'REMOVER_PRODUTO':
      return state.filter(item => item.idUnico !== action.produtoIdUnico);
      
    case 'ATUALIZAR_QUANTIDADE':
      return state.map(item =>
        item.idUnico === action.produtoIdUnico
          ? { ...item, quantidade: action.quantidade }
          : item
      );
      
    case 'LIMPAR_CARRINHO':
      return [];
      
    default:
      return state;
  }
};

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, dispatch] = useReducer(carrinhoReducer, []);

  const adicionarAoCarrinho = (produto) => {
    dispatch({ type: 'ADICIONAR_PRODUTO', produto });
  };

  const removerDoCarrinho = (produtoIdUnico) => {
    dispatch({ type: 'REMOVER_PRODUTO', produtoIdUnico });
  };

  const atualizarQuantidade = (produtoIdUnico, quantidade) => {
    if (quantidade < 1) {
      removerDoCarrinho(produtoIdUnico);
      return;
    }
    dispatch({ type: 'ATUALIZAR_QUANTIDADE', produtoIdUnico, quantidade });
  };

  const limparCarrinho = () => {
    dispatch({ type: 'LIMPAR_CARRINHO' });
  };

  const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
  const totalPreco = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);

  return (
    <CarrinhoContext.Provider value={{
      carrinho,
      adicionarAoCarrinho,
      removerDoCarrinho,
      atualizarQuantidade,
      limparCarrinho,
      totalItens,
      totalPreco
    }}>
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error('useCarrinho deve ser usado dentro de CarrinhoProvider');
  }
  return context;
};