import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login.js';
import Cadastro from './screens/Cadastro.js';
import Pedidos from './screens/Pedidos.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Meus Pedidos">
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Cadastro' component={Cadastro} />
        <Stack.Screen name='Meus Pedidos' component={Pedidos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}