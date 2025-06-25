import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

const DisciplinaScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Tela de Disciplinas</Text>
        <Text style={styles.text}>Aqui você poderá visualizar e gerenciar as disciplinas do sistema escolar.</Text>
        {/* Aqui futuramente será adicionado o CRUD de disciplinas */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DisciplinaScreen;

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
