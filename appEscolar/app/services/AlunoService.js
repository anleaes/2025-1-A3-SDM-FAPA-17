import axios from 'axios';

const API_URL = 'http://192.168.0.191:8000/alunos/';

export const getAlunos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    throw error;
  }
};

export const createAluno = async (aluno) => {
  try {
    const response = await axios.post(API_URL, aluno);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar aluno:', error);
    throw error;
  }
};

export const updateAluno = async (id, aluno) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, aluno);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar aluno:', error);
    throw error;
  }
};

export const deleteAluno = async (id) => {
  try {
    await axios.delete(`${API_URL}${id}/`);
  } catch (error) {
    console.error('Erro ao deletar aluno:', error);
    throw error;
  }
};

// Adiciona isso dentro do AlunoService

const atualizarAluno = async (id, aluno) => {
  const response = await axios.put(`${API_URL}/alunos/${id}/`, aluno);
  return response.data;
};

export default {
  listarAlunos,
  criarAluno,
  atualizarAluno, // Adiciona aqui
};
