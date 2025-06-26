import api from '../api';

const NotaService = {
  listar: async () => {
    try {
      const response = await api.get('/notas/');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar notas:', error);
      return [];
    }
  },

  criar: async (novaNota) => {
    try {
      const response = await api.post('/notas/', novaNota);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar nota:', error);
      throw error;
    }
  },

  atualizar: async (id, notaAtualizada) => {
    try {
      const response = await api.put(`/notas/${id}/`, notaAtualizada);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar nota:', error);
      throw error;
    }
  },

  deletar: async (id) => {
    try {
      await api.delete(`/notas/${id}/`);
    } catch (error) {
      console.error('Erro ao deletar nota:', error);
      throw error;
    }
  },
};

export default NotaService;
