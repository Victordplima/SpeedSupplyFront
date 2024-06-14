import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { isTokenExpired } from '../utils/tokenUtils';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [userType, setUserType] = useState(null);

    const login = async (token) => {
        setUserToken(token);
        try {
            await AsyncStorage.setItem('userToken', token);
            const decodedToken = jwtDecode(token); // Decodifica o token
            setUserType(decodedToken.tipoUsuario); // Define o tipo de usuário a partir do token decodificado
            console.log('Token:', token);
            console.log('Tipo de usuário:', decodedToken.tipoUsuario);
        } catch (error) {
            console.error('Erro ao salvar token no AsyncStorage:', error);
        }
    };

    const logout = async () => {
        setUserToken(null);
        setUserType(null);
        try {
            await AsyncStorage.removeItem('userToken');
        } catch (error) {
            console.error('Erro ao remover token do AsyncStorage:', error);
        }
    };

    const checkTokenValidity = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (token && isTokenExpired(token)) {
                await logout(); // Token expirado, realizar logout
            }
        } catch (error) {
            console.error('Erro ao verificar a validade do token:', error);
        }
    };

    useEffect(() => {
        const loadToken = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (token) {
                    if (isTokenExpired(token)) {
                        await logout(); // Token expirado, realizar logout
                    } else {
                        setUserToken(token);
                        const decodedToken = jwtDecode(token);
                        setUserType(decodedToken.tipoUsuario);
                    }
                }
            } catch (error) {
                console.error('Erro ao carregar token do AsyncStorage:', error);
            }
        };
        loadToken();
    }, []);

    return (
        <AuthContext.Provider value={{ userToken, userType, login, logout, checkTokenValidity }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
