import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export const useProdutos = (destaque = false) => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        setLoading(true);
        
        const response = destaque 
          ? await apiService.getProdutosDestaque()
          : await apiService.getProdutos();
        
        console.log('Dados recebidos:', response.data);
        
        // Extrai o array de produtos do campo 'results'
        const dados = response.data.results || [];
        setProdutos(dados);
        
      } catch (err) {
        console.error('Erro completo:', err);
        setError('Erro ao carregar produtos: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    carregarProdutos();
  }, [destaque]);

  return { produtos, loading, error };
};