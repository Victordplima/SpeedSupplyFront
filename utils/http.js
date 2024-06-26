import axios from 'axios';

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
        console.log('Dados enviados para a API:', userData);

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
        const response = await api.get(`/users/search/${numPage}`, {
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

export const getProfileInformation = async (idProfile, userToken) => {
    try {
        const response = await api.get(`/users/profile/${idProfile}`, {
            headers: {
                Authorization: `${userToken}`,
            },
        });

        const produtos = response.data;

        if (produtos.length === 0) {
            throw new Error('Perfil não encontrado');
        }

        const perfil = {
            nome: produtos[0].nome,
            telefone: produtos[0].telefoneCelular,
            descricao: produtos[0].descricao,
            produtos: produtos.map(produto => ({
                id: produto.idProduto,
                nomeComercial: produto.nomeComercial,
                nomeTecnico: produto.nomeTecnico,
                valorUnidade: produto.valorUnidade,
                peso: produto.peso,
                material: produto.material,
                dimensoes: produto.dimensoes,
                fabricante: produto.fabricante,
                statusProduto: produto.statusProduto,
                imagemDoUsuario: produto.imagemDoUsuario,
            })),
            endereco: `${produtos[0].rua}, ${produtos[0].numero} - ${produtos[0].bairro}, ${produtos[0].cidade} - ${produtos[0].estado}, CEP: ${produtos[0].cep}`,
        };

        return perfil;
    } catch (error) {
        console.error('Erro ao buscar informações do perfil:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error('Erro ao conectar com o servidor');
    }
};

export const sendRequest = async (payload, userToken) => {
    try {
        const response = await api.post('/requests/send', payload, {
            headers: {
                Authorization: `${userToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao enviar pedido:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error('Erro ao conectar com o servidor');
    }
};


export const searchRequests = async (userToken) => {
    try {
        const response = await api.get('/requests/search', {
            headers: {
                Authorization: `${userToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error('Erro ao conectar com o servidor');
    }
};

export const cancelRequest = async (idPedido, userToken) => {
    try {
        const response = await api.delete(`/requests/cancel/${idPedido}`, {
            headers: {
                Authorization: `${userToken}`,
            },
        });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Erro ao cancelar o pedido');
        }
    } catch (error) {
        console.error('Erro ao cancelar pedido:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error('Erro ao conectar com o servidor');
    }
};

export const addProduct = async (productData, userToken) => {
    try {
        const response = await api.post('/products/add', productData, {
            headers: {
                Authorization: `${userToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao adicionar produto:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error('Erro ao conectar com o servidor');
    }
};

export const editProduct = async (idProduto, productData, userToken) => {
    try {
        const response = await api.put(`/products/edit/${idProduto}`, productData, {
            headers: {
                Authorization: `${userToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao editar produto:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error('Erro ao conectar com o servidor');
    }
};

export const deleteProduct = async (idProduto, userToken) => {
    try {
        const response = await api.delete(`/products/delete/${idProduto}`, {
            headers: {
                Authorization: `${userToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao deletar produto:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error('Erro ao conectar com o servidor');
    }
};

export const acceptRequest = async (idPedido, userToken) => {
    try {
        const response = await api.put(`/requests/accept/${idPedido}`, {}, {
            headers: {
                Authorization: `${userToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao aceitar pedido:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error('Erro ao conectar com o servidor');
    }
};

export const rejectRequest = async (idPedido, userToken) => {
    try {
        const response = await api.put(`/requests/reject/${idPedido}`, {}, {
            headers: {
                Authorization: `${userToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao rejeitar pedido:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error('Erro ao conectar com o servidor');
    }
};

export const deliverRequest = async (idPedido, userToken) => {
    try {
        const response = await api.put(`/requests/request/${idPedido}`, {}, {
            headers: {
                Authorization: `${userToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao marcar pedido como entregue:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error('Erro ao conectar com o servidor');
    }
};