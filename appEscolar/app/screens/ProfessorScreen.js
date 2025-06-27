import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import ProfessorService from '../services/ProfessorService';

export default function ProfessorScreen() {
  const [professores, setProfessores] = useState([]);
  const [novoProfessor, setNovoProfessor] = useState({ nome: '', email: '', disciplina: '' });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    carregarProfessores();
  }, []);

  const carregarProfessores = async () => {
    try {
      const response = await ProfessorService.listarProfessores();
      setProfessores(response.data);
    } catch (error) {
      console.error('Erro ao carregar professores:', error);
    }
  };

  const salvarProfessor = async () => {
    try {
      await ProfessorService.criarProfessor(novoProfessor);
      setNovoProfessor({ nome: '', email: '', disciplina: '' });
      setMostrarFormulario(false);
      carregarProfessores();
    } catch (error) {
      console.error('Erro ao salvar professor:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Professores</Text>

      <FlatList
        data={professores}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.nome} - {item.email} - {item.disciplina}</Text>
        )}
      />

      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => setMostrarFormulario(!mostrarFormulario)}
      >
        <Text style={styles.botaoTexto}>{mostrarFormulario ? 'Cancelar' : 'Adicionar Professor'}</Text>
      </TouchableOpacity>

      {mostrarFormulario && (
        <View style={styles.formulario}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={novoProfessor.nome}
            onChangeText={(text) => setNovoProfessor({ ...novoProfessor, nome: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={novoProfessor.email}
            onChangeText={(text) => setNovoProfessor({ ...novoProfessor, email: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Disciplina"
            value={novoProfessor.disciplina}
            onChangeText={(text) => setNovoProfessor({ ...novoProfessor, disciplina: text })}
          />
          <TouchableOpacity style={styles.botaoSalvar} onPress={salvarProfessor}>
            <Text style={styles.botaoTexto}>Salvar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  item: { fontSize: 16, marginBottom: 5 },
  botaoAdicionar: {
    backgroundColor: '#007AFF',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  botaoTexto: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  formulario: { marginTop: 10 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10, borderRadius: 5
  },
  botaoSalvar: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
  },
});