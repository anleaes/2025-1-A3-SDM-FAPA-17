import api from './api';

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
