// services/DisciplinaService.js
import api from './api';

const endpoint = '/disciplinas/';

const listarDisciplinas = async () => {
  const response = await api.get(endpoint);
  return response.data;
};

const buscarDisciplinaPorId = async (id) => {
  const response = await api.get(`${endpoint}${id}/`);
  return response.data;
};

const criarDisciplina = async (dados) => {
  const response = await api.post(endpoint, dados);
  return response.data;
};

const atualizarDisciplina = async (id, dados) => {
  const response = await api.put(`${endpoint}${id}/`, dados);
  return response.data;
};

const deletarDisciplina = async (id) => {
  await api.delete(`${endpoint}${id}/`);
};

export default {
  listarDisciplinas,
  buscarDisciplinaPorId,
  criarDisciplina,
  atualizarDisciplina,
  deletarDisciplina,
};
