import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export const useCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriasHierarquia, setCategoriasHierarquia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para construir hierarquia
  const construirHierarquia = (categoriasArray) => {
    const categoriasMap = {};
    const categoriasRaiz = [];
    
    // Primeiro, mapeia todas as categorias por ID
    categoriasArray.forEach(cat => {
      categoriasMap[cat.id] = { ...cat, subcategorias: [] };
    });
    
    // Depois, organiza hierarquia
    categoriasArray.forEach(cat => {
      if (cat.parent && categoriasMap[cat.parent]) {
        // É subcategoria
        categoriasMap[cat.parent].subcategorias.push(categoriasMap[cat.id]);
      } else {
        // É categoria raiz
        categoriasRaiz.push(categoriasMap[cat.id]);
      }
    });
    
    return categoriasRaiz;
  };

  useEffect(() => {
    const carregarCategorias = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiService.getCategorias();
        
        if (!response || !response.data) {
          throw new Error('Resposta da API inválida');
        }
        
        let dados = [];
        if (Array.isArray(response.data)) {
          dados = response.data;
        } else if (response.data.results && Array.isArray(response.data.results)) {
          dados = response.data.results;
        } else if (typeof response.data === 'object') {
          dados = Object.values(response.data);
        }
        
        if (!Array.isArray(dados)) {
          console.warn('Dados de categorias não são um array:', dados);
          dados = [];
        }
        
        setCategorias(dados);
        setCategoriasHierarquia(construirHierarquia(dados));
        
      } catch (err) {
        console.error('Erro ao carregar categorias:', err);
        setError(err.message || 'Erro ao carregar categorias');
        setCategorias([]);
        setCategoriasHierarquia([]);
      } finally {
        setLoading(false);
      }
    };

    carregarCategorias();
  }, []);

  return { 
    categorias, 
    categoriasHierarquia, 
    loading, 
    error,
    construirHierarquia 
  };
};