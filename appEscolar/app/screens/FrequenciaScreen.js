// screens/FrequenciaScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FrequenciaScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Frequência</Text>
    </View>
  );
};

export default FrequenciaScreen;

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
