import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

export default function PerfilCRUDScreen() {
  const [perfil, setPerfil] = useState({ nome: '', tipo: '' });
  const [perfis, setPerfis] = useState([]);

  const handleChange = (field, value) => {
    setPerfil({ ...perfil, [field]: value });
  };

  const handleAdd = () => {
    if (perfil.nome && perfil.tipo) {
      setPerfis([...perfis, perfil]);
      setPerfil({ nome: '', tipo: '' });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Perfis</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={perfil.nome}
        onChangeText={(text) => handleChange('nome', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Tipo"
        value={perfil.tipo}
        onChangeText={(text) => handleChange('tipo', text)}
      />

      <Button title="Adicionar Perfil" onPress={handleAdd} />

      <View style={styles.listContainer}>
        {perfis.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text>{item.nome} - {item.tipo}</Text>
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
    backgroundColor: '#f2f2f2',
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
