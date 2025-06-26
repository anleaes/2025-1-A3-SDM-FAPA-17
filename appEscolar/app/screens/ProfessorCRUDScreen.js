import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import {
  getProfessores,
  createProfessor,
  updateProfessor,
  deleteProfessor,
} from '../services/ProfessorService';

export default function ProfessorCRUDScreen() {
  const [professores, setProfessores] = useState([]);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [formacao, setFormacao] = useState('');
  const [areaAtuacao, setAreaAtuacao] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    carregarProfessores();
  }, []);

  const carregarProfessores = async () => {
    try {
      const data = await getProfessores();
      setProfessores(data);
    } catch (error) {
      console.error('Erro ao carregar professores:', error);
    }
  };

  const limparCampos = () => {
    setNome('');
    setCpf('');
    setEmail('');
    setFormacao('');
    setAreaAtuacao('');
    setEditandoId(null);
  };

  const salvarProfessor = async () => {
    const novoProfessor = {
      nome,
      cpf,
      email,
      formacao,
      area_atuacao: areaAtuacao,
    };

    try {
      if (editandoId) {
        await updateProfessor(editandoId, novoProfessor);
      } else {
        await createProfessor(novoProfessor);
      }
      limparCampos();
      carregarProfessores();
    } catch (error) {
      console.error('Erro ao salvar professor:', error);
    }
  };

  const editar = (prof) => {
    setNome(prof.nome);
    setCpf(prof.cpf);
    setEmail(prof.email);
    setFormacao(prof.formacao);
    setAreaAtuacao(prof.area_atuacao);
    setEditandoId(prof.id);
  };

  const excluir = async (id) => {
    try {
      await deleteProfessor(id);
      carregarProfessores();
    } catch (error) {
      console.error('Erro ao excluir professor:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Professor</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Formação"
        value={formacao}
        onChangeText={setFormacao}
      />
      <TextInput
        style={styles.input}
        placeholder="Área de Atuação"
        value={areaAtuacao}
        onChangeText={setAreaAtuacao}
      />

      <Button title={editandoId ? "Atualizar" : "Cadastrar"} onPress={salvarProfessor} />

      <FlatList
        data={professores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.nome} - {item.formacao}</Text>
            <View style={styles.actions}>
              <Button title="Editar" onPress={() => editar(item)} />
              <Button title="Excluir" color="red" onPress={() => excluir(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10, borderRadius: 5 },
  item: { padding: 10, marginVertical: 5, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
  itemText: { fontSize: 16 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
});
