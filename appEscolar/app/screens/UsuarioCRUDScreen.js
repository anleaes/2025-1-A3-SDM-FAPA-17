import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

export default function UsuarioCRUDScreen() {
  const [usuario, setUsuario] = useState({ nome: '', email: '', tipo: '' });
  const [usuarios, setUsuarios] = useState([]);

  const handleChange = (field, value) => {
    setUsuario({ ...usuario, [field]: value });
  };

  const handleAdd = () => {
    if (usuario.nome && usuario.email && usuario.tipo) {
      setUsuarios([...usuarios, usuario]);
      setUsuario({ nome: '', email: '', tipo: '' });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Usuários</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={usuario.nome}
        onChangeText={(text) => handleChange('nome', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={usuario.email}
        onChangeText={(text) => handleChange('email', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Tipo (ex: aluno, professor, admin)"
        value={usuario.tipo}
        onChangeText={(text) => handleChange('tipo', text)}
      />

      <Button title="Adicionar Usuário" onPress={handleAdd} />

      <View style={styles.listContainer}>
        {usuarios.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text>{item.nome} - {item.email} - {item.tipo}</Text>
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
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
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
