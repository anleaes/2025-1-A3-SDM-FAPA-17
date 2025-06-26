import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

export default function ProfessorCRUDScreen() {
  const [professor, setProfessor] = useState({ nome: '', email: '', disciplina: '' });
  const [professores, setProfessores] = useState([]);

  const handleChange = (field, value) => {
    setProfessor({ ...professor, [field]: value });
  };

  const handleAdd = () => {
    if (professor.nome && professor.email && professor.disciplina) {
      setProfessores([...professores, professor]);
      setProfessor({ nome: '', email: '', disciplina: '' });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Professores</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={professor.nome}
        onChangeText={(text) => handleChange('nome', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={professor.email}
        onChangeText={(text) => handleChange('email', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Disciplina"
        value={professor.disciplina}
        onChangeText={(text) => handleChange('disciplina', text)}
      />

      <Button title="Adicionar Professor" onPress={handleAdd} />

      <View style={styles.listContainer}>
        {professores.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text>{item.nome} - {item.email} - {item.disciplina}</Text>
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
