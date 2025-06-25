// screens/UsuarioScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UsuarioScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Usuário</Text>
    </View>
  );
};

export default UsuarioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
});
