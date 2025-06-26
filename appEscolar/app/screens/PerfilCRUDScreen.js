import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import PerfilService from '../services/PerfilService';

const PerfilCRUDScreen = () => {
  const [perfis, setPerfis] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  const carregarPerfis = async () => {
    const dados = await PerfilService.listar();
    setPerfis(dados);
  };

  const salvar = async () => {
    const perfil = { nome, descricao };

    if (editandoId) {
      await PerfilService.atualizar(editandoId, perfil);
      setEditandoId(null);
    } else {
      await PerfilService.criar(perfil);
    }

    setNome('');
    setDescricao('');
    carregarPerfis();
  };

  const editar = (perfil) => {
    setNome(perfil.nome);
    setDescricao(perfil.descricao);
    setEditandoId(perfil.id);
  };

  const deletar = async (id) => {
    await PerfilService.excluir(id);
    carregarPerfis();
  };

  useEffect(() => {
    carregarPerfis();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Perfis</Text>
      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        placeholder="Descrição"
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
      />
      <Button title={editandoId ? "Atualizar" : "Cadastrar"} onPress={salvar} />
      <FlatList
        data={perfis}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nome} - {item.descricao}</Text>
            <View style={styles.botoes}>
              <Button title="Editar" onPress={() => editar(item)} />
              <Button title="Excluir" onPress={() => deletar(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, marginBottom: 8, padding: 8 },
  item: { marginBottom: 12 },
  botoes: { flexDirection: 'row', justifyContent: 'space-between' },
});

export default PerfilCRUDScreen;
