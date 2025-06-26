import api from '../api';

const endpoint = '/carrinhos/';

const CarrinhoMatriculaService = {
  listar: async () => {
    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Erro ao listar carrinhos:', error);
      return [];
    }
  },

  criar: async (novoCarrinho) => {
    try {
      const response = await api.post(endpoint, novoCarrinho);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar carrinho:', error);
      throw error;
    }
  },

  atualizar: async (id, carrinhoAtualizado) => {
    try {
      const response = await api.put(`${endpoint}${id}/`, carrinhoAtualizado);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar carrinho:', error);
      throw error;
    }
  },

  excluir: async (id) => {
    try {
      await api.delete(`${endpoint}${id}/`);
    } catch (error) {
      console.error('Erro ao excluir carrinho:', error);
      throw error;
    }
  },
};

export default CarrinhoMatriculaService;
