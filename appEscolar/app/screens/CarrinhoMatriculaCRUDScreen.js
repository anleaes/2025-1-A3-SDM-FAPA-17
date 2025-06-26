import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import CarrinhoMatriculaService from '../services/CarrinhoMatriculaService';

const CarrinhoMatriculaCRUDScreen = () => {
  const [carrinhos, setCarrinhos] = useState([]);
  const [aluno, setAluno] = useState('');
  const [status, setStatus] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  const carregarCarrinhos = async () => {
    const dados = await CarrinhoMatriculaService.listar();
    setCarrinhos(dados);
  };

  useEffect(() => {
    carregarCarrinhos();
  }, []);

  const limparCampos = () => {
    setAluno('');
    setStatus('');
    setEditandoId(null);
  };

  const salvarCarrinho = async () => {
    const novoCarrinho = { aluno, status };

    try {
      if (editandoId) {
        await CarrinhoMatriculaService.atualizar(editandoId, novoCarrinho);
        Alert.alert('Atualizado com sucesso');
      } else {
        await CarrinhoMatriculaService.criar(novoCarrinho);
        Alert.alert('Criado com sucesso');
      }
      carregarCarrinhos();
      limparCampos();
    } catch (error) {
      Alert.alert('Erro ao salvar carrinho');
    }
  };

  const editarCarrinho = (carrinho) => {
    setAluno(carrinho.aluno);
    setStatus(carrinho.status);
    setEditandoId(carrinho.id);
  };

  const excluirCarrinho = async (id) => {
    try {
      await CarrinhoMatriculaService.excluir(id);
      carregarCarrinhos();
      Alert.alert('Excluído com sucesso');
    } catch (error) {
      Alert.alert('Erro ao excluir');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Carrinho de Matrícula</Text>

      <TextInput
        style={styles.input}
        placeholder="Aluno (nome)"
        value={aluno}
        onChangeText={setAluno}
      />

      <TextInput
        style={styles.input}
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
      />

      <Button title={editandoId ? 'Atualizar' : 'Criar'} onPress={salvarCarrinho} />

      <FlatList
        data={carrinhos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.aluno} - {item.status}</Text>
            <View style={styles.botoes}>
              <Button title="Editar" onPress={() => editarCarrinho(item)} />
              <Button title="Excluir" color="red" onPress={() => excluirCarrinho(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default CarrinhoMatriculaCRUDScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
});
