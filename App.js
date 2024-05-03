import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Login from './screens/Login.js';
import Cadastro from './screens/CadastroEtapa1.js';
import Pedidos from './screens/LadoCliente/MeusPedidos.js';
import ProdutosDistribuidora from './screens/LadoDistribuidora/ProdutosDistribuidora.js';
import PedidosDistribuidora from './screens/LadoDistribuidora/PedidosDistribuidora.js';
import FeedDistribuidora from './screens/LadoCliente/FeedDistribuidora.js';
import CadastroEtapa2 from './screens/CadastroEtapa2.js';
import PerfilDistribuidora from './screens/LadoCliente/PerfilDistribuidora.js';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name='Login'
        component={Login}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Cadastro'
        component={Cadastro}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name='Cadastro Etapa 2'
        component={CadastroEtapa2}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />

      {/*<Tab.Screen
        name='Distibuidora'
        component={FeedDistribuidora}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="archive-outline" size={size} color={color} />
          ),
        }}
      />*/}

      <Tab.Screen
        name='Meus Pedidos'
        component={Pedidos}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name='Perfil Distribuidora'
        component={DistribuidoraPerfilStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />
      {/*<Tab.Screen
        name='Clientes'
        component={PedidosCliente}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />*/}
      <Tab.Screen
        name='Produtos'
        component={DistribuidoraStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cube-outline" size={size} color={color} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}

// Stack Navigator para tela de Produtos e Pedidos Distribuidora
function DistribuidoraStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='ProdutosDistribuidora'
        component={ProdutosDistribuidora}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='PedidosDistribuidora'
        component={PedidosDistribuidora}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function DistribuidoraPerfilStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='FeedDistribuidora'
        component={FeedDistribuidora}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='PerfilDistribuidora'
        component={PerfilDistribuidora}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='MainTabs'
          component={MainTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

