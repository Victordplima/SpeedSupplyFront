import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/authContext';
import { getProfileInformation } from '../../utils/http';

const PerfilDistribuidora = ({ route }) => {
    const { idProfile } = route.params;
    const { userToken } = useContext(AuthContext);

    const [perfil, setPerfil] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantidades, setQuantidades] = useState({});

    useEffect(() => {
        const loadPerfil = async () => {
            try {
                setLoading(true);
                const data = await getProfileInformation(idProfile, userToken);
                console.log('Loaded profile:', data);
                setPerfil(data);
            } catch (error) {
                console.error('Erro ao carregar perfil:', error.message);
                setError('Erro ao carregar perfil: ' + error.message);
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

    const atualizarQuantidade = (id, quantidade) => {
        setQuantidades(prevState => ({
            ...prevState,
            [id]: quantidade,
        }));
    };

    const limparQuantidades = () => {
        setQuantidades({});
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#018ABE" />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    if (!perfil) {
        return <Text>Perfil não encontrado</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="ellipse-outline" size={50} color="blue" style={styles.logo} />
                <Text style={styles.title}>{perfil.nome}</Text>
            </View>
            <Text style={styles.TelefoneDist}>Telefone: {perfil.telefone}</Text>
            <Text style={styles.endereco}>{perfil.endereco}</Text>
            <TouchableOpacity style={styles.buttonLimpar} onPress={limparQuantidades}>
                <Text style={styles.carrinhoButtonText}>Limpar</Text>
            </TouchableOpacity>
            <ScrollView style={styles.produtosContainer}>
                {perfil.produtos.map(produto => (
                    <View key={produto.id} style={styles.produtoItem}>
                        <View style={styles.infoProduto}>
                            <Text style={styles.produtoNome}>{produto.nomeComercial}</Text>
                            <Text style={styles.produtoPreco}>{`R$ ${produto.valorUnidade}`}</Text>
                        </View>
                        <TextInput
                            style={styles.inputQuantidade}
                            keyboardType="numeric"
                            placeholder="Qtd"
                            onChangeText={text => atualizarQuantidade(produto.id, text)}
                            value={quantidades[produto.id] ? quantidades[produto.id].toString() : ''}
                        />
                    </View>
                ))}
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.carrinhoButton}>
                    <Ionicons name="cart-outline" size={24} color="white" />
                    <Text style={styles.carrinhoButtonText}>Fazer Pedido</Text>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: '10%',
    },
    logo: {
        marginRight: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
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
        backgroundColor: 'lightgray',
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
    TelefoneDist: {
        fontSize: 16,
        marginBottom: 10,
        paddingHorizontal: '10%',
    },
    endereco: {
        fontSize: 16,
        marginBottom: 10,
        paddingHorizontal: '10%',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    carrinhoButton: {
        alignItems: 'center',
        backgroundColor: '#018ABE',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    carrinhoButtonText: {
        color: 'white',
        paddingHorizontal: '10%',
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
});

export default PerfilDistribuidora;
