// Screens/FrequenciaCRUDScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function FrequenciaCRUDScreen() {
  const [frequencias, setFrequencias] = useState([]);
  const [novaFrequencia, setNovaFrequencia] = useState({
    status: '',
    data: '',
    justificativa: '',
    aluno: '',
  });

  useEffect(() => {
    buscarFrequencias();
  }, []);

  const buscarFrequencias = async () => {
    try {
      const response = await axios.get('http://localhost:8000/frequencias/');
      setFrequencias(response.data);
    } catch (error) {
      console.error('Erro ao buscar frequências:', error);
    }
  };

  const adicionarFrequencia = async () => {
    try {
      await axios.post('http://localhost:8000/frequencias/', novaFrequencia);
      buscarFrequencias();
      setNovaFrequencia({ status: '', data: '', justificativa: '', aluno: '' });
    } catch (error) {
      console.error('Erro ao adicionar frequência:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.aluno} - {item.status} - {item.data}</Text>
      {item.justificativa && <Text>Justificativa: {item.justificativa}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Frequência</Text>
      <TextInput
        style={styles.input}
        placeholder="Status"
        value={novaFrequencia.status}
        onChangeText={text => setNovaFrequencia({ ...novaFrequencia, status: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Data (YYYY-MM-DD)"
        value={novaFrequencia.data}
        onChangeText={text => setNovaFrequencia({ ...novaFrequencia, data: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Justificativa"
        value={novaFrequencia.justificativa}
        onChangeText={text => setNovaFrequencia({ ...novaFrequencia, justificativa: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Aluno"
        value={novaFrequencia.aluno}
        onChangeText={text => setNovaFrequencia({ ...novaFrequencia, aluno: text })}
      />
      <Button title="Adicionar Frequência" onPress={adicionarFrequencia} />
      <FlatList
        data={frequencias}
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
