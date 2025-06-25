import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

const ProfessorScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Tela de Professores</Text>
        <Text style={styles.text}>Aqui você poderá visualizar e gerenciar os professores cadastrados no sistema escolar.</Text>
        {/* Aqui futuramente será adicionado o CRUD de professores */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfessorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
});
