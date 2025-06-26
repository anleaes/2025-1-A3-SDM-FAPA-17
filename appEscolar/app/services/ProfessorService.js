import axios from 'axios';

const API_URL = 'http://192.168.0.191:8000/professores/';

export const getProfessores = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar professores:', error);
    throw error;
  }
};

export const createProfessor = async (professor) => {
  try {
    const response = await axios.post(API_URL, professor);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar professor:', error);
    throw error;
  }
};

export const updateProfessor = async (id, professor) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, professor);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar professor:', error);
    throw error;
  }
};

export const deleteProfessor = async (id) => {
  try {
    await axios.delete(`${API_URL}${id}/`);
  } catch (error) {
    console.error('Erro ao deletar professor:', error);
    throw error;
  }
};
