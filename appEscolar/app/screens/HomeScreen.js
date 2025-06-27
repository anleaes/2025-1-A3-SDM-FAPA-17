import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bem-vindo ao App Escolar</Text>
      
      <Button title="Ir para Alunos" onPress={() => navigation.navigate('Alunos')} />
      <Button title="Ir para Professores" onPress={() => navigation.navigate('Professores')} />
      <Button title="Ir para Turmas" onPress={() => navigation.navigate('Turmas')} />
      <Button title="Ir para Disciplinas" onPress={() => navigation.navigate('Disciplinas')} />
      <Button title="Ir para Notas" onPress={() => navigation.navigate('Notas')} />
      <Button title="Ir para Frequências" onPress={() => navigation.navigate('Frequências')} />
      <Button title="Ir para Carrinho" onPress={() => navigation.navigate('Carrinho')} />
      <Button title="Ir para Perfis" onPress={() => navigation.navigate('Perfis')} />
      <Button title="Ir para Usuários" onPress={() => navigation.navigate('Usuários')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});
