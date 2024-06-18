import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Login from './screens/Login';
import Cadastro from './screens/CadastroEtapa1';
import MeusPedidos from './screens/LadoCliente/MeusPedidos';
import Carga from './screens/LadoDistribuidora/Carga';
import PedidosDistribuidora from './screens/LadoDistribuidora/PedidosDistribuidora';
import FeedDistribuidora from './screens/LadoCliente/FeedDistribuidora';
import CadastroEtapa2 from './screens/CadastroEtapa2';
import PerfilDistribuidora from './screens/LadoCliente/PerfilDistribuidora';
import ConfirmacaoPedido from './screens/LadoCliente/ConfirmacaoPedido';
import TelaInicial from './screens/TelaInicial';
import Notificacoes from './screens/Notificacao';
import { AuthContext, AuthProvider } from './context/authContext';
import Perfil from './screens/LadoCliente/Perfil';
import PerfilDaDistribuidora from './screens/LadoDistribuidora/PerfilDaDistribuidora';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabsCliente() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Distribuidoras') {
                        iconName = 'home-outline';
                    } else if (route.name === 'Meus Pedidos') {
                        iconName = 'cart-outline';
                    } else if (route.name === 'PerfilDistribuidora') {
                        iconName = 'person-outline';
                    } else if (route.name === 'Perfil') {
                        iconName = 'person-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                "tabBarStyle": [
                    {
                        "display": "flex"
                    },
                    null
                ]
            })}
            tabBarOptions={{
                tabBarActiveTintColor: "#018ABE",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: [
                    {
                        display: "flex"
                    },
                    null
                ]
            }}
        >
            <Tab.Screen name='Distribuidoras' component={FeedDistribuidoraStack} />
            <Tab.Screen name='Meus Pedidos' component={MeusPedidos} />
            <Tab.Screen name='Perfil' component={Perfil} />
        </Tab.Navigator>
    );
}

function FeedDistribuidoraStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Feed Distribuidora" component={FeedDistribuidora} options={{ headerShown: false }} />
            <Stack.Screen name="PerfilDistribuidora" component={PerfilDistribuidora} options={{ headerShown: false }} />
            <Stack.Screen name="ConfirmacaoPedido" component={ConfirmacaoPedido} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

function MainTabsDistribuidora() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Pedidos') {
                        iconName = 'list-outline';
                    } else if (route.name === 'Carga') {
                        iconName = 'cube-outline';
                    } else if (route.name === 'Perfil') {
                        iconName = 'person-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            
            tabBarOptions={{
                tabBarActiveTintColor: "#018ABE",
                tabBarInactiveTintColor: "gray",
                tabBarStyle: [
                    {
                        display: "flex"
                    },
                    null
                ]
            }}
        >
            <Tab.Screen name='Carga' component={Carga}/>
            <Tab.Screen name='Pedidos' component={PedidosDistribuidora}/>
            <Tab.Screen name='Perfil' component={PerfilDaDistribuidora}/>
        </Tab.Navigator>
    );
}



function LoginCadastroStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Tela Inicial' component={TelaInicial} options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='Cadastro' component={Cadastro} options={{ headerShown: false }} />
            <Stack.Screen name='Cadastro Etapa 2' component={CadastroEtapa2} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

function AppNavigator() {
    const { userToken, userType, checkTokenValidity } = useContext(AuthContext);

    useEffect(() => {
        checkTokenValidity();
    }, []);

    return (
        <NavigationContainer>
            {userToken ? (
                userType === 'cliente' ? (
                    <MainTabsCliente />
                ) : (
                    <MainTabsDistribuidora />
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
