import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import das telas
import HomeScreen from './screens/HomeScreen';
import AlunoScreen from './screens/AlunoScreen';
import ProfessorScreen from './screens/ProfessorScreen';
import TurmaScreen from './screens/TurmaScreen';
import DisciplinaScreen from './screens/DisciplinaScreen';
import NotaScreen from './screens/NotaScreen';
import FrequenciaScreen from './screens/FrequenciaScreen';
import CarrinhoMatriculaScreen from './screens/CarrinhoMatriculaScreen';
import PerfilScreen from './screens/PerfilScreen';
import UsuarioScreen from './screens/UsuarioScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Alunos" component={AlunoScreen} />
        <Stack.Screen name="Professores" component={ProfessorScreen} />
        <Stack.Screen name="Turmas" component={TurmaScreen} />
        <Stack.Screen name="Disciplinas" component={DisciplinaScreen} />
        <Stack.Screen name="Notas" component={NotaScreen} />
        <Stack.Screen name="Frequências" component={FrequenciaScreen} />
        <Stack.Screen name="Carrinho" component={CarrinhoMatriculaScreen} />
        <Stack.Screen name="Perfis" component={PerfilScreen} />
        <Stack.Screen name="Usuários" component={UsuarioScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
