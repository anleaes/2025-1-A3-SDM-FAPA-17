// app/tabs/TabsNavigation.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AlunoScreen from '../screens/AlunoScreen';
import ProfessorScreen from '../screens/ProfessorScreen';

const Tab = createBottomTabNavigator();

export default function TabsNavigation() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Alunos" component={AlunoScreen} />
      <Tab.Screen name="Professores" component={ProfessorScreen} />
    </Tab.Navigator>
  );
}
