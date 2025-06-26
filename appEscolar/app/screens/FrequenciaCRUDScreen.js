import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import FrequenciaService from '../services/FrequenciaService';

export default function FrequenciaCRUDScreen() {
  const [frequencias, setFrequencias] = useState([]);
  const [status, setStatus] = useState('');
  const [data, setData] = useState('');
  const [justificativa, setJustificativa] = useState('');
  const [alunoId, setAlunoId] = useState('');
  const [disciplinaId, setDisciplinaId] = useState('');
  const [idSelecionado, setIdSelecionado] = useState(null);

  async function carregarFrequencias() {
    const dados = await FrequenciaService.listar();
    setFrequencias(dados);
  }

  useEffect(() => {
    carregarFrequencias();
  }, []);

  async function salvar() {
    const frequencia = {
      status,
      data,
      justificativa,
      aluno: alunoId,
      disciplina: disciplinaId || null
    };

    if (idSelecionado) {
      await FrequenciaService.atualizar(idSelecionado, frequencia);
    } else {
      await FrequenciaService.criar(frequencia);
    }

    limparCampos();
    carregarFrequencias();
  }

  async function excluir(id) {
    await FrequenciaService.excluir(id);
    carregarFrequencias();
  }

  function selecionarFrequencia(f) {
    setStatus(f.status);
    setData(f.data);
    setJustificativa(f.justificativa);
    setAlunoId(f.aluno);
    setDisciplinaId(f.disciplina);
    setIdSelecionado(f.id);
  }

  function limparCampos() {
    setStatus('');
    setData('');
    setJustificativa('');
    setAlunoId('');
    setDisciplinaId('');
    setIdSelecionado(null);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Frequência</Text>

      <TextInput style={styles.input} placeholder="Status" value={status} onChangeText={setStatus} />
      <TextInput style={styles.input} placeholder="Data (YYYY-MM-DD)" value={data} onChangeText={setData} />
      <TextInput style={styles.input} placeholder="Justificativa" value={justificativa} onChangeText={setJustificativa} />
      <TextInput style={styles.input} placeholder="ID do Aluno" value={alunoId} onChangeText={setAlunoId} />
      <TextInput style={styles.input} placeholder="ID da Disciplina (opcional)" value={disciplinaId} onChangeText={setDisciplinaId} />

      <Button title={idSelecionado ? 'Atualizar' : 'Salvar'} onPress={salvar} />
      <FlatList
        data={frequencias}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.status} - {item.data}</Text>
            <Button title="Editar" onPress={() => selecionarFrequencia(item)} />
            <Button title="Excluir" onPress={() => excluir(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, marginBottom: 10 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8 },
  item: { marginTop: 10, borderBottomWidth: 1, paddingBottom: 5 }
});
