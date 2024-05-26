import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode"; // Importe a biblioteca jwt-decode

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [userRole, setUserRole] = useState(null);

    const login = async (token) => { // Não é mais necessário passar a role como argumento
        setUserToken(token);
        try {
            await AsyncStorage.setItem('userToken', token);
        } catch (error) {
            console.error('Erro ao salvar token no AsyncStorage:', error);
        }
    };

    const logout = async () => {
        setUserToken(null);
        try {
            await AsyncStorage.removeItem('userToken');
        } catch (error) {
            console.error('Erro ao remover token do AsyncStorage:', error);
        }
    };

    useEffect(() => {
        const loadToken = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (token) {
                    setUserToken(token);
                    // Decodifique o token para obter as informações (incluindo a role)
                    const decodedToken = jwt_decode(token);
                    const role = decodedToken.role; // Supondo que a role esteja armazenada no campo "role" do token
                    setUserRole(role);
                }
            } catch (error) {
                console.error('Erro ao carregar token do AsyncStorage:', error);
            }
        };
        loadToken();
    }, []);

    return (
        <AuthContext.Provider value={{ userToken, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
