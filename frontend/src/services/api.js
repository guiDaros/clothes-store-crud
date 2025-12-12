import axios from "axios";

// Configuração base do axios
const api = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 10000,
});

// Interceptor para tratar erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na API:", error);
    return Promise.reject(error);
  }
);

// Serviços da API
// export const apiService = {
//   getConfiguracao: () => api.get("/configuracao/"),
//   getBanners: () => api.get("/banners/"),
//   getProdutos: (params = {}) => api.get("/produtos/", { params }),
//   getProdutosDestaque: () =>
//     api.get("/produtos/", { params: { destaque: true } }),
//   getMarcas: () => api.get("/marcas/"),
//   getCategorias: () => api.get("/categorias/"),
//   getTags: () => api.get("/tags/"),
//   criarPedido: (pedidoData) => api.post("/pedidos/", pedidoData),
//   buscarProdutos: (query) =>
//     api.get("/produtos/buscar/", { params: { q: query } }),
// };

// Serviços da API - ADICIONAR ESTAS LINHAS:

export const apiService = {
  getConfiguracao: () => api.get("/configuracao/"),
  getBanners: () => api.get("/banners/"),
  getProdutos: (params = {}) => api.get("/produtos/", { params }),
  getProdutosDestaque: () =>
    api.get("/produtos/", { params: { destaque: true } }),
  getMarcas: () => api.get("/marcas/"),
  
  getCategorias: () => api.get("/categorias/"),
  
  getCategoriasPais: () => api.get("/categorias/pais/"),
  
  getTags: () => api.get("/tags/"),
  criarPedido: (pedidoData) => api.post("/pedidos/", pedidoData),
  buscarProdutos: (query) =>
    api.get("/produtos/buscar/", { params: { q: query } }),
  
  get: (url, config = {}) => api.get(url, config),
};

export default api;
