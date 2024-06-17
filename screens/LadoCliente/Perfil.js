import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext, logout } from '../../context/authContext';
import { getProfileInformation } from '../../utils/http';
import { jwtDecode } from 'jwt-decode';

const Perfil = ({ navigation }) => {
    const { userToken, logout } = useContext(AuthContext);
    const decodedToken = jwtDecode(userToken);
    const idProfile = decodedToken.idUsuario;
    const [perfil, setPerfil] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPerfil = async () => {
            try {
                setLoading(true);
                const data = await getProfileInformation(idProfile, userToken);
                console.log('Loaded profile:', data);
                setPerfil(data);
                setError(null);
            } catch (error) {
                console.error('Erro ao carregar perfil:', error.message);
                setError('Erro ao carregar perfil. Tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        };

        if (idProfile && userToken) {
            console.log('Fetching profile with idProfile:', idProfile, 'and userToken:', userToken);
            loadPerfil();
        } else {
            console.log('Invalid idProfile or userToken:', idProfile, userToken);
            setError('ID do perfil ou token do usuário inválido.');
            setLoading(false);
        }
    }, [idProfile, userToken]);

    if (loading) {
        return <ActivityIndicator size="large" color="#018ABE" />;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    if (!perfil) {
        return <Text style={styles.errorText}>Perfil não encontrado</Text>;
    }

    const formatarTelefone = (telefone) => {
        // Verifica se o telefone tem a formatação correta
        if (telefone.length === 10) {
            return `(${telefone.substr(0, 2)}) ${telefone.substr(2, 4)}-${telefone.substr(6, 4)}`;
        } else if (telefone.length === 11) {
            return `(${telefone.substr(0, 2)}) ${telefone.substr(2, 5)}-${telefone.substr(7, 4)}`;
        }
        // Retorna o telefone sem formatação caso não corresponda ao esperado
        return telefone;
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigation.navigate('Tela Inicial');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.informacoes}>
                <View style={styles.header}>
                    <Text style={styles.title}>{perfil.nome}</Text>
                </View>

                <Text style={styles.descricao}>{perfil.descricao}</Text>
                <View style={styles.telefoneContainer}>
                    <Ionicons name="call-outline" size={24} color="black" style={styles.icon} />
                    <Text style={styles.telefone}>{formatarTelefone(perfil.telefone)}</Text>
                </View>
                <View style={styles.enderecoContainer}>
                    <Ionicons name="location-outline" size={24} color="black" style={styles.icon} />
                    <Text style={styles.endereco}>{perfil.endereco}</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.carrinhoButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={24} color="white" />
                    <Text style={styles.carrinhoButtonText}>Deslogar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    informacoes: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: '10%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
    },
    descricao: {
        fontSize: 16,
        marginBottom: 10,
        paddingHorizontal: '5%',
    },
    telefoneContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        paddingHorizontal: '5%',
        justifyContent: 'flex-start',
    },
    enderecoContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        paddingHorizontal: '5%',
        justifyContent: 'flex-start',
    },
    icon: {
        marginRight: 10,
    },
    produtosContainer: {
        marginBottom: 20,
        maxHeight: '60%',
    },
    produtoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#E6E4E7',
        marginBottom: 10,
        borderRadius: 10,
    },
    infoProduto: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    produtoNome: {
        fontSize: 16,
        marginRight: 10,
    },
    produtoPreco: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputQuantidade: {
        width: '40%',
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    carrinhoButton: {
        alignItems: 'center',
        backgroundColor: '#9c0000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    carrinhoButtonText: {
        color: 'white',
    },
    buttonLimpar: {
        alignItems: 'center',
        backgroundColor: '#018ABE',
        paddingVertical: 10,
        borderRadius: 20,
        width: '47%',
        alignSelf: 'flex-end',
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#018ABE',
        padding: 10,
        borderRadius: 10,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Perfil;
