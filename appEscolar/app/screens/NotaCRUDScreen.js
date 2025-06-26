import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import NotaService from '../services/NotaService';

export default function NotaCRUDScreen() {
  const [notas, setNotas] = useState([]);
  const [valor, setValor] = useState('');
  const [dataLancamento, setDataLancamento] = useState('');
  const [observacao, setObservacao] = useState('');
  const [alunoId, setAlunoId] = useState('');
  const [disciplinaId, setDisciplinaId] = useState('');

  useEffect(() => {
    carregarNotas();
  }, []);

  const carregarNotas = async () => {
    const dados = await NotaService.listar();
    setNotas(dados);
  };

  const adicionarNota = async () => {
    const novaNota = {
      valor,
      data_lancamento: dataLancamento,
      observacao,
      aluno: alunoId,
      disciplina: disciplinaId,
    };
    await NotaService.criar(novaNota);
    carregarNotas();
    setValor('');
    setDataLancamento('');
    setObservacao('');
    setAlunoId('');
    setDisciplinaId('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Nota</Text>

      <TextInput placeholder="Valor" value={valor} onChangeText={setValor} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Data de Lançamento (AAAA-MM-DD)" value={dataLancamento} onChangeText={setDataLancamento} style={styles.input} />
      <TextInput placeholder="Observação" value={observacao} onChangeText={setObservacao} style={styles.input} />
      <TextInput placeholder="ID do Aluno" value={alunoId} onChangeText={setAlunoId} style={styles.input} />
      <TextInput placeholder="ID da Disciplina" value={disciplinaId} onChangeText={setDisciplinaId} style={styles.input} />

      <Button title="Adicionar Nota" onPress={adicionarNota} />

      <FlatList
        data={notas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.valor} - {item.aluno} ({item.data_lancamento})</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 },
  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
});
