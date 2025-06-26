import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario
} from '../services/UsuarioService';

export default function UsuarioCRUDScreen() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [perfil, setPerfil] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    const data = await getUsuarios();
    setUsuarios(data);
  };

  const limpar = () => {
    setNome('');
    setEmail('');
    setSenha('');
    setPerfil('');
    setEditandoId(null);
  };

  const salvar = async () => {
    const usuario = { nome, email, senha, perfil };

    if (editandoId) {
      await updateUsuario(editandoId, usuario);
    } else {
      await createUsuario(usuario);
    }

    limpar();
    carregarUsuarios();
  };

  const editar = (usuario) => {
    setNome(usuario.nome);
    setEmail(usuario.email);
    setSenha(usuario.senha);
    setPerfil(usuario.perfil);
    setEditandoId(usuario.id);
  };

  const excluir = async (id) => {
    await deleteUsuario(id);
    carregarUsuarios();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuários</Text>

      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Senha"
        style={styles.input}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TextInput
        placeholder="Perfil"
        style={styles.input}
        value={perfil}
        onChangeText={setPerfil}
      />

      <Button title={editandoId ? 'Atualizar' : 'Cadastrar'} onPress={salvar} />

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nome} - {item.email}</Text>
            <View style={styles.actions}>
              <Button title="Editar" onPress={() => editar(item)} />
              <Button title="Excluir" onPress={() => excluir(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10, borderRadius: 5 },
  item: { padding: 10, marginVertical: 5, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
});
