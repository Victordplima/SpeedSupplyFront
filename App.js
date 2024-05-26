import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Login from './screens/Login.js';
import Cadastro from './screens/CadastroEtapa1.js';
import MeusPedidos from './screens/LadoCliente/MeusPedidos.js';
import ProdutosDistribuidora from './screens/LadoDistribuidora/ProdutosDistribuidora.js';
import PedidosDistribuidora from './screens/LadoDistribuidora/PedidosDistribuidora.js';
import FeedDistribuidora from './screens/LadoCliente/FeedDistribuidora.js';
import CadastroEtapa2 from './screens/CadastroEtapa2.js';
import PerfilDistribuidora from './screens/LadoCliente/PerfilDistribuidora.js';
import TelaInicial from './screens/TelaInicial.js';
import Notificacoes from './screens/Notificacao.js';
import { AuthContext, AuthProvider } from './context/authContext'; // Importe o AuthContext e AuthProvider

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabsCliente() {
    return (
        <Tab.Navigator
            screenOptions={{
                activeTintColor: 'blue',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen
                name='FeedDistribuidora'
                component={FeedDistribuidora}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name='Meus Pedidos'
                component={MeusPedidos}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cart-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name='PerfilDistribuidora'
                component={PerfilDistribuidora}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

function MainTabsDistribuidora() {
    return (
        <Tab.Navigator
            screenOptions={{
                activeTintColor: 'blue',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen
                name='PedidosDistribuidora'
                component={PedidosDistribuidora}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cube-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name='ProdutosDistribuidora'
                component={ProdutosDistribuidora}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cube-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
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

function LoginCadastroStack() {
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

function AppNavigator() {
    const { userToken, userRole } = useContext(AuthContext); // Use userRole do contexto

    return (
        <NavigationContainer>
            {userToken ? (
                userRole === 'cliente' ? ( // Verifica se é cliente
                    <MainTabsCliente />
                ) : (
                    <MainTabsDistribuidora /> // Se não, é distribuidora
                )
            ) : (
                <LoginCadastroStack />
            )}
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <AppNavigator />
        </AuthProvider>
    );
}
