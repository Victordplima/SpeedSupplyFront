import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Modal } from 'react-native';
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
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

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

    const abrirModal = (produto) => {
        setSelectedProduct(produto);
        setModalVisible(true);
    };

    const fecharModal = () => {
        setModalVisible(false);
        setSelectedProduct(null);
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
            <View style={styles.informacoes}>
                <View style={styles.header}>
                    <Text style={styles.title}>{perfil.nome}</Text>
                </View>

                <Text style={styles.descricao}>{perfil.descricao}</Text>
                <Text style={styles.telefone}>Telefone: {perfil.telefone}</Text>
                <Text style={styles.endereco}>{perfil.endereco}</Text>
            </View>
            <TouchableOpacity style={styles.buttonLimpar} onPress={limparQuantidades}>
                <Text style={styles.carrinhoButtonText}>Limpar</Text>
            </TouchableOpacity>
            <ScrollView style={styles.produtosContainer}>
                {perfil.produtos.map(produto => (
                    <TouchableOpacity key={produto.id} onPress={() => abrirModal(produto)}>
                        <View style={styles.produtoItem}>
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
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.carrinhoButton}>
                    <Ionicons name="cart-outline" size={24} color="white" />
                    <Text style={styles.carrinhoButtonText}>Fazer Pedido</Text>
                </TouchableOpacity>
            </View>

            {selectedProduct && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={fecharModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{selectedProduct.nomeComercial}</Text>
                            <Text>Nome Técnico: {selectedProduct.nomeTecnico}</Text>
                            <Text>Fabricante: {selectedProduct.fabricante}</Text>
                            <Text>Material: {selectedProduct.material}</Text>
                            <Text>Dimensões: {selectedProduct.dimensoes}</Text>
                            <Text>Peso: {selectedProduct.peso}g</Text>
                            <TouchableOpacity style={styles.closeButton} onPress={fecharModal}>
                                <Text style={styles.closeButtonText}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        //paddingTop: 20,
        backgroundColor: '#fbf2ff',
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
        //paddin
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
    telefone: {
        fontSize: 16,
        marginBottom: 10,
        paddingHorizontal: '10%',
    },
    endereco: {
        fontSize: 16,
        marginBottom: 10,
        paddingHorizontal: '5%',
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
        backgroundColor: '#018ABE',
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

export default PerfilDistribuidora;
