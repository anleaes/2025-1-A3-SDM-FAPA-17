import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AlunoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Aluno</Text>
      <Text style={styles.text}>Aqui você poderá visualizar as informações dos alunos.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: '#555',
  },
});
