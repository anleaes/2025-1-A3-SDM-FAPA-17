import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotaScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notas</Text>
      <Text style={styles.text}>Aqui você verá todas as notas dos alunos!</Text>
    </View>
  );
};

export default NotaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef6ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1e3a8a',
  },
  text: {
    fontSize: 16,
    color: '#334155',
    textAlign: 'center',
  },
});
