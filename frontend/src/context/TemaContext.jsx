import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const TemaContext = createContext();

export const TemaProvider = ({ children }) => {
  const [configuracao, setConfiguracao] = useState({
    logo_url: '',
    cor_principal: '#111111',
    modo_escuro: false,
    telefone_whatsapp: '',
    endereco: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarConfiguracao = async () => {
      try {
        setLoading(true);
        const response = await apiService.getConfiguracao();
        const dados = response.data.results?.[0] || response.data || {};
        setConfiguracao(dados);
        
        // Aplica CSS variables dinamicamente
        aplicarTema(dados);
        
      } catch (error) {
        console.error('Erro ao carregar configuração:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarConfiguracao();
  }, []);

  const aplicarTema = (config) => {
    const root = document.documentElement;
    
    // Cor principal
    root.style.setProperty('--cor-principal', config.cor_principal || '#111111');
    
    // Cores derivadas
    const corPrincipal = config.cor_principal || '#111111';
    root.style.setProperty('--cor-principal-clara', `${corPrincipal}20`); // 20% opacity
    root.style.setProperty('--cor-principal-escura', escurecerCor(corPrincipal, 20));
    
    // Modo claro/escuro
    if (config.modo_escuro) {
      root.style.setProperty('--cor-fundo', '#1a1a1a');
      root.style.setProperty('--cor-texto', '#ffffff');
      root.style.setProperty('--cor-borda', '#333333');
      root.style.setProperty('--cor-card', '#2d2d2d');
    } else {
      root.style.setProperty('--cor-fundo', '#ffffff');
      root.style.setProperty('--cor-texto', '#111111');
      root.style.setProperty('--cor-borda', '#e5e5e5');
      root.style.setProperty('--cor-card', '#ffffff');
    }
  };

  // Função para escurecer cor HEX
  const escurecerCor = (hex, percent) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    r = Math.floor(r * (100 - percent) / 100);
    g = Math.floor(g * (100 - percent) / 100);
    b = Math.floor(b * (100 - percent) / 100);

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  return (
    <TemaContext.Provider value={{ configuracao, loading }}>
      {children}
    </TemaContext.Provider>
  );
};

export const useTema = () => {
  const context = useContext(TemaContext);
  if (!context) {
    throw new Error('useTema deve ser usado dentro de TemaProvider');
  }
  return context;
};