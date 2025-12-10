import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export const useMarcas = () => {
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarMarcas = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiService.getMarcas();
        
        // Verifica se a resposta existe
        if (!response || !response.data) {
          throw new Error('Resposta da API inválida');
        }
        
        // Extrai dados de forma segura
        let dados = [];
        if (Array.isArray(response.data)) {
          dados = response.data;
        } else if (response.data.results && Array.isArray(response.data.results)) {
          dados = response.data.results;
        } else if (typeof response.data === 'object') {
          // Tenta converter objeto para array
          dados = Object.values(response.data);
        }
        
        // Garante que é um array
        if (!Array.isArray(dados)) {
          console.warn('Dados de marcas não são um array:', dados);
          dados = [];
        }
        
        setMarcas(dados);
        
      } catch (err) {
        console.error('Erro ao carregar marcas:', err);
        setError(err.message || 'Erro ao carregar marcas');
        setMarcas([]); // Garante array vazio em caso de erro
      } finally {
        setLoading(false);
      }
    };

    carregarMarcas();
  }, []);

  return { marcas, loading, error };
};