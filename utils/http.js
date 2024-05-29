import axios from 'axios';
import { AuthContext } from '../context/authContext';

const API_URL = 'https://supplyspeedbackend2.onrender.com';

const api = axios.create({
    baseURL: API_URL,
});

export const login = async (email, senha) => {
    try {
        const response = await api.post('/users/login', { email, senha });
        return response.data;
    } catch (error) {
        console.error('Erro ao logar:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error('Erro ao conectar com o servidor');
    }
};

export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users/signup`, {
            ...userData,
            descricao: null,
            estado: null,
        });
        return response.data.token;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Erro ao conectar com o servidor');
        } else {
            throw new Error('Erro ao conectar com o servidor');
        }
    }
};


export const searchDistribuidoras = async (numPage, userToken) => {
    try {
        const response = await api.get(`/users/searchInformation/${numPage}`, {
            headers: {
                Authorization: `${userToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar distribuidoras:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error('Erro ao conectar com o servidor');
    }
};