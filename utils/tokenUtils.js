import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token) => {
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Em segundos
        return decodedToken.exp < currentTime;
    } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return true; // Se houver um erro ao decodificar, considere o token como expirado
    }
};