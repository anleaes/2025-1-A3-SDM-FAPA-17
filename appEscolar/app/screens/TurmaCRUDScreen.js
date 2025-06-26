import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

export default function TurmaCRUDScreen() {
  const [turma, setTurma] = useState({ nome: '', turno: '', sala: '' });
  const [turmas, setTurmas] = useState([]);

  const handleChange = (field, value) => {
    setTurma({ ...turma, [field]: value });
  };

  const handleAdd = () => {
    if (turma.nome && turma.turno && turma.sala) {
      setTurmas([...turmas, turma]);
      setTurma({ nome: '', turno: '', sala: '' });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Turmas</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da Turma"
        value={turma.nome}
        onChangeText={(text) => handleChange('nome', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Turno"
        value={turma.turno}
        onChangeText={(text) => handleChange('turno', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Sala"
        value={turma.sala}
        onChangeText={(text) => handleChange('sala', text)}
      />

      <Button title="Adicionar Turma" onPress={handleAdd} />

      <View style={styles.listContainer}>
        {turmas.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text>{item.nome} - {item.turno} - Sala {item.sala}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  listContainer: {
    marginTop: 20,
  },
  item: {
    padding: 10,
    backgroundColor: '#dcdcdc',
    marginBottom: 5,
    borderRadius: 5,
  },
});
