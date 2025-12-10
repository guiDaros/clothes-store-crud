import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export const useProdutosFiltrados = (categoriaId = null, marcaId = null) => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params = {};
        if (categoriaId) params.categoria = categoriaId;
        if (marcaId) params.marca = marcaId;
        
        const response = await apiService.getProdutos(params);
        
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
          console.warn('Dados de produtos filtrados não são um array:', dados);
          dados = [];
        }
        
        setProdutos(dados);
        
      } catch (err) {
        console.error('Erro ao carregar produtos filtrados:', err);
        setError(err.message || 'Erro ao carregar produtos');
        setProdutos([]);
      } finally {
        setLoading(false);
      }
    };

    carregarProdutos();
  }, [categoriaId, marcaId]);

  return { produtos, loading, error };
};