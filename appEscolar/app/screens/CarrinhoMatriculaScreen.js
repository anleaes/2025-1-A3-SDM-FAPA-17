// screens/CarrinhoMatriculaScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CarrinhoMatriculaScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela do Carrinho de Matrícula</Text>
    </View>
  );
};

export default CarrinhoMatriculaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
});

