import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import DisciplinaService from '../services/DisciplinaService';

export default function DisciplinaCRUDScreen() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [nome, setNome] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');
  const [professor, setProfessor] = useState('');
  const [turma, setTurma] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    carregarDisciplinas();
  }, []);

  const carregarDisciplinas = async () => {
    const dados = await DisciplinaService.listar();
    setDisciplinas(dados);
  };

  const salvar = async () => {
    const dados = {
      nome,
      carga_horaria: parseInt(cargaHoraria),
      professor,
      turma,
    };

    if (editandoId) {
      await DisciplinaService.atualizar(editandoId, dados);
    } else {
      await DisciplinaService.criar(dados);
    }

    limparCampos();
    carregarDisciplinas();
  };

  const editar = (disciplina) => {
    setEditandoId(disciplina.id);
    setNome(disciplina.nome);
    setCargaHoraria(disciplina.carga_horaria.toString());
    setProfessor(disciplina.professor);
    setTurma(disciplina.turma);
  };

  const excluir = async (id) => {
    await DisciplinaService.excluir(id);
    carregarDisciplinas();
  };

  const limparCampos = () => {
    setNome('');
    setCargaHoraria('');
    setProfessor('');
    setTurma('');
    setEditandoId(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Disciplinas</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Carga Horária"
        value={cargaHoraria}
        onChangeText={setCargaHoraria}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Professor (nome)"
        value={professor}
        onChangeText={setProfessor}
      />
      <TextInput
        style={styles.input}
        placeholder="Turma (nome)"
        value={turma}
        onChangeText={setTurma}
      />

      <Button title={editandoId ? "Atualizar" : "Salvar"} onPress={salvar} />

      <FlatList
        data={disciplinas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nome} - {item.professor} - {item.turma}</Text>
            <View style={styles.botoes}>
              <Button title="Editar" onPress={() => editar(item)} />
              <Button title="Excluir" onPress={() => excluir(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  titulo: {
    fontSize: 22,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  item: {
    padding: 10,
    marginVertical: 5,
    borderBottomWidth: 1,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
