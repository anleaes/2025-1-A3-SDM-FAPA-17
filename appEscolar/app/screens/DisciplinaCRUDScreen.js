// 1. Crie a branch:
// git checkout -b tela_disciplina_crud

// 2. Crie o arquivo: DisciplinaCRUDScreen.js dentro de screens/

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.0.108:8000/disciplinas/';

export default function DisciplinaCRUDScreen() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [nome, setNome] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');
  const [turma, setTurma] = useState('');
  const [professor, setProfessor] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchDisciplinas = async () => {
    try {
      const response = await axios.get(API_URL);
      setDisciplinas(response.data);
    } catch (error) {
      console.error('Erro ao buscar disciplinas:', error);
    }
  };

  useEffect(() => {
    fetchDisciplinas();
  }, []);

  const handleSalvar = async () => {
    const novaDisciplina = {
      nome,
      carga_horaria: parseInt(cargaHoraria),
      turma,
      professor,
    };

    try {
      if (editId) {
        await axios.put(`${API_URL}${editId}/`, novaDisciplina);
      } else {
        await axios.post(API_URL, novaDisciplina);
      }
      fetchDisciplinas();
      limparCampos();
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  const handleEditar = (disciplina) => {
    setNome(disciplina.nome);
    setCargaHoraria(disciplina.carga_horaria.toString());
    setTurma(disciplina.turma);
    setProfessor(disciplina.professor);
    setEditId(disciplina.id);
  };

  const handleExcluir = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      fetchDisciplinas();
    } catch (error) {
      console.error('Erro ao excluir:', error);
    }
  };

  const limparCampos = () => {
    setNome('');
    setCargaHoraria('');
    setTurma('');
    setProfessor('');
    setEditId(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Disciplinas</Text>

      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Carga Horária" value={cargaHoraria} onChangeText={setCargaHoraria} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Turma" value={turma} onChangeText={setTurma} style={styles.input} />
      <TextInput placeholder="Professor" value={professor} onChangeText={setProfessor} style={styles.input} />

      <Button title={editId ? 'Atualizar' : 'Cadastrar'} onPress={handleSalvar} />

      <FlatList
        data={disciplinas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nome} - {item.carga_horaria}h</Text>
            <Button title="Editar" onPress={() => handleEditar(item)} />
            <Button title="Excluir" onPress={() => handleExcluir(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10, borderRadius: 5 },
  item: { marginBottom: 10, borderBottomWidth: 1, paddingBottom: 5 },
});
