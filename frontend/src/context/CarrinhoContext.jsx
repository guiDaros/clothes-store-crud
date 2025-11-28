import React, { createContext, useContext, useReducer } from 'react';

const CarrinhoContext = createContext();

const carrinhoReducer = (state, action) => {
  switch (action.type) {
    case 'ADICIONAR_PRODUTO': {
      const existingItem = state.find(item => item.id === action.produto.id);
      
      if (existingItem) {
        return state.map(item =>
          item.id === action.produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      
      return [...state, { ...action.produto, quantidade: 1 }];
    }
      
    case 'REMOVER_PRODUTO':
      return state.filter(item => item.id !== action.produtoId);
      
    case 'ATUALIZAR_QUANTIDADE':
      return state.map(item =>
        item.id === action.produtoId
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

  const removerDoCarrinho = (produtoId) => {
    dispatch({ type: 'REMOVER_PRODUTO', produtoId });
  };

  const atualizarQuantidade = (produtoId, quantidade) => {
    dispatch({ type: 'ATUALIZAR_QUANTIDADE', produtoId, quantidade });
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