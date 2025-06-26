import api from './api';

export async function getUsuarios() {
  const response = await api.get('/usuarios/');
  return response.data;
}

export async function createUsuario(usuario) {
  const response = await api.post('/usuarios/', usuario);
  return response.data;
}

export async function updateUsuario(id, usuario) {
  const response = await api.put(`/usuarios/${id}/`, usuario);
  return response.data;
}

export async function deleteUsuario(id) {
  await api.delete(`/usuarios/${id}/`);
}
