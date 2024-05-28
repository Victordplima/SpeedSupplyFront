import axios from 'axios';

const API_URL = 'https://supplyspeedbackend2.onrender.com';

export const login = async (email, senha) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, {
            email,
            senha,
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Erro ao conectar com o servidor');
    }
};
