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
import TelaInicial from './screens/TelaInicial.js';
import Notificacoes from './screens/Notificacao.js';


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
                name='LoginCadastro'
                component={LoginCadastro}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cube-outline" size={size} color={color} />
                    ),
                }}
            />
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
                name='Distribuidoras'
                component={DistribuidoraPerfilStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cart-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name='Carga'
                component={DistribuidoraStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cube-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name='Notificações'
                component={Notificacoes}
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


function LoginCadastro() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Tela Inicial'
                component={TelaInicial}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Login'
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Cadastro'
                component={Cadastro}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Cadastro Etapa 2'
                component={CadastroEtapa2}
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

