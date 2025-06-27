import api from './api';
import axios from 'axios';

const API_URL = 'http://192.168.0.191:8000/api/professores/';
const listarProfessores = () => axios.get(API_URL);
const criarProfessor = (professor) => axios.post(API_URL, professor);
const endpoint = '/perfil/';

const listar = async () => {
  const response = await api.get(endpoint);
  return response.data;
};

const criar = async (perfil) => {
  const response = await api.post(endpoint, perfil);
  return response.data;
};

const atualizar = async (id, perfil) => {
  const response = await api.put(`${endpoint}${id}/`, perfil);
  return response.data;
};

const excluir = async (id) => {
  await api.delete(`${endpoint}${id}/`);
};

export default {
  listar,
  criar,
  atualizar,
  excluir,
};
