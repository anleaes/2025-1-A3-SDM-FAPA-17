// Screens/NotaCRUDScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function NotaCRUDScreen() {
  const [notas, setNotas] = useState([]);
  const [novaNota, setNovaNota] = useState({
    valor: '',
    data_lancamento: '',
    observacao: '',
    aluno: '',
    disciplina: ''
  });

  useEffect(() => {
    buscarNotas();
  }, []);

  const buscarNotas = async () => {
    try {
      const response = await axios.get('http://localhost:8000/notas/');
      setNotas(response.data);
    } catch (error) {
      console.error('Erro ao buscar notas:', error);
    }
  };

  const adicionarNota = async () => {
    try {
      await axios.post('http://localhost:8000/notas/', novaNota);
      buscarNotas();
      setNovaNota({
        valor: '',
        data_lancamento: '',
        observacao: '',
        aluno: '',
        disciplina: ''
      });
    } catch (error) {
      console.error('Erro ao adicionar nota:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.aluno} - {item.valor} ({item.data_lancamento})</Text>
      {item.observacao && <Text>Obs: {item.observacao}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Nota</Text>
      <TextInput
        style={styles.input}
        placeholder="Valor"
        value={novaNota.valor}
        onChangeText={text => setNovaNota({ ...novaNota, valor: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Data (YYYY-MM-DD)"
        value={novaNota.data_lancamento}
        onChangeText={text => setNovaNota({ ...novaNota, data_lancamento: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Observação"
        value={novaNota.observacao}
        onChangeText={text => setNovaNota({ ...novaNota, observacao: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Aluno"
        value={novaNota.aluno}
        onChangeText={text => setNovaNota({ ...novaNota, aluno: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Disciplina"
        value={novaNota.disciplina}
        onChangeText={text => setNovaNota({ ...novaNota, disciplina: text })}
      />
      <Button title="Adicionar Nota" onPress={adicionarNota} />
      <FlatList
        data={notas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, marginBottom: 10 },
  input: { borderWidth: 1, padding: 8, marginBottom: 10 },
  item: { padding: 10, borderBottomWidth: 1 }
});
