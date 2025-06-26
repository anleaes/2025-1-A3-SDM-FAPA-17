import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const AlunoScreen = () => {
  const [alunos, setAlunos] = useState([]);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [matricula, setMatricula] = useState('');
  const [curso, setCurso] = useState('');

  const API_URL = 'http://<SEU_IP>:8000/alunos/'; // Substituir pelo IP da máquina rodando o Django

  const buscarAlunos = async () => {
    const resposta = await axios.get(API_URL);
    setAlunos(resposta.data);
  };

  const criarAluno = async () => {
    await axios.post(API_URL, { nome, cpf, email, matricula, curso });
    buscarAlunos();
    setNome('');
    setCpf('');
    setEmail('');
    setMatricula('');
    setCurso('');
  };

  const deletarAluno = async (id) => {
    await axios.delete(`${API_URL}${id}/`);
    buscarAlunos();
  };

  useEffect(() => {
    buscarAlunos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Alunos</Text>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="CPF" value={cpf} onChangeText={setCpf} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Matrícula" value={matricula} onChangeText={setMatricula} style={styles.input} />
      <TextInput placeholder="Curso" value={curso} onChangeText={setCurso} style={styles.input} />
      <Button title="Salvar" onPress={criarAluno} />

      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nome} - {item.curso}</Text>
            <Button title="Excluir" onPress={() => deletarAluno(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default AlunoScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8 },
  item: { marginTop: 10, borderBottomWidth: 1, paddingBottom: 5 }
});
