import api from './api';

const endpoint = '/frequencias/';

const listar = async () => {
  const response = await api.get(endpoint);
  return response.data;
};

const criar = async (frequencia) => {
  const response = await api.post(endpoint, frequencia);
  return response.data;
};

const atualizar = async (id, frequencia) => {
  const response = await api.put(`${endpoint}${id}/`, frequencia);
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
