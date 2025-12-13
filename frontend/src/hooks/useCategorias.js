import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export const useCategorias = () => {
  const [categoriasHierarquia, setCategoriasHierarquia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarCategorias = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Iniciando carregamento de categorias...');
        
        // TENTA primeiro o novo endpoint
        let response;
        let veioDoEndpointPais = false;
        
        try {
          console.log('Tentando endpoint /categorias/pais/...');
          response = await apiService.getCategoriasPais();
          veioDoEndpointPais = true;
          console.log('Sucesso no endpoint /pais/', response.data);
        } catch (err) {
          console.warn('Endpoint /pais/ não disponível, usando endpoint padrão', err);
          // Fallback: busca todas e monta hierarquia
          response = await apiService.getCategorias();
          console.log('Usando endpoint padrão', response.data);
        }
        
        if (!response || !response.data) {
          throw new Error('Resposta da API inválida');
        }
        
        let dados = response.data;
        
        if (!Array.isArray(dados)) {
          console.warn('Dados de categorias não são um array:', dados);
          dados = [];
        }
        
        // DEBUG: Mostra estrutura recebida
        console.log('Dados brutos da API:', dados);
        
        // Se NÃO veio do endpoint /pais/, monta hierarquia manualmente
        if (!veioDoEndpointPais) {
          console.log('Montando hierarquia manualmente...');
          dados = construirHierarquia(dados);
        }
        
        // DEBUG: Mostra estrutura após processamento
        console.log('Dados após processamento:', dados);
        
        // Adiciona a opção "Todos" como primeira categoria
        const categoriasComTodos = [
          {
            id: null,
            nome: 'Todos',
            subcategorias: []
          },
          ...dados
        ];
        
        console.log('Categorias finais para o header:', categoriasComTodos);
        setCategoriasHierarquia(categoriasComTodos);
        
      } catch (err) {
        console.error('Erro ao carregar categorias:', err);
        setError(err.message || 'Erro ao carregar categorias');
        setCategoriasHierarquia([]);
      } finally {
        setLoading(false);
      }
    };

    carregarCategorias();
  }, []);

  // Função fallback (APENAS se endpoint /pais/ não existir)
  const construirHierarquia = (categoriasArray) => {
    if (!Array.isArray(categoriasArray)) return [];
    
    const categoriasMap = {};
    const categoriasRaiz = [];
    
    // Passo 1: Criar mapa com estrutura básica
    categoriasArray.forEach(cat => {
      categoriasMap[cat.id] = { 
        id: cat.id,
        nome: cat.nome,
        parent: cat.parent,
        subcategorias: [] // Inicializa vazio
      };
    });
    
    // Passo 2: Organizar hierarquia
    categoriasArray.forEach(cat => {
      const categoriaAtual = categoriasMap[cat.id];
      
      if (cat.parent && categoriasMap[cat.parent]) {
        // É subcategoria: adiciona ao pai
        categoriasMap[cat.parent].subcategorias.push(categoriaAtual);
      } else {
        // É categoria raiz
        categoriasRaiz.push(categoriaAtual);
      }
    });
    
    // Limita a 5 categorias pai (e remove parent dos pais)
    return categoriasRaiz.slice(0, 5).map(cat => ({
      id: cat.id,
      nome: cat.nome,
      subcategorias: cat.subcategorias
    }));
  };

  return { 
    categoriasHierarquia, 
    loading, 
    error
  };
};