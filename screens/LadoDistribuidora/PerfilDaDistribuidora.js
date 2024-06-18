import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Modal, Alert, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/authContext';
import { getProfileInformation, addProduct, editProduct, deleteProduct } from '../../utils/http';
import { jwtDecode } from 'jwt-decode';

const PerfilDaDistribuidora = ({ navigation }) => {
    const { userToken, logout } = useContext(AuthContext);
    const decodedToken = jwtDecode(userToken);
    const idProfile = decodedToken.idUsuario;
    const [perfil, setPerfil] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [productDetails, setProductDetails] = useState({
        descricao: '',
        valorUnidade: '',
        nomeComercial: '',
        nomeTecnico: '',
        peso: '',
        material: '',
        dimensoes: '',
        fabricante: '',
    });

    const loadPerfil = async () => {
        try {
            setLoading(true);
            const data = await getProfileInformation(idProfile, userToken);
            setPerfil(data);
            setError(null);
        } catch (error) {
            setError('Erro ao carregar perfil. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        if (idProfile && userToken) {
            loadPerfil();
        } else {
            setError('ID do perfil ou token do usuário inválido.');
            setLoading(false);
        }
    }, [idProfile, userToken]);

    const handleLogout = async () => {
        try {
            await logout();
            navigation.navigate('Tela Inicial');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    const handleProductAdd = async () => {
        try {
            const response = await addProduct(productDetails, userToken);
            Alert.alert('Sucesso', 'Produto adicionado com sucesso');
            setModalVisible(false);
            setProductDetails({
                descricao: '',
                valorUnidade: '',
                nomeComercial: '',
                nomeTecnico: '',
                peso: '',
                material: '',
                dimensoes: '',
                fabricante: '',
            });
            await loadPerfil();
        } catch (error) {
            Alert.alert('Erro', 'Erro ao adicionar produto. Tente novamente.');
        }
    };

    const handleProductEdit = async (idProduto) => {
        try {
            const response = await editProduct(idProduto, productDetails, userToken);
            Alert.alert('Sucesso', 'Produto editado com sucesso');
            setModalVisible(false);
            setProductDetails({
                descricao: '',
                valorUnidade: '',
                nomeComercial: '',
                nomeTecnico: '',
                peso: '',
                material: '',
                dimensoes: '',
                fabricante: '',
            });
            await loadPerfil();
        } catch (error) {
            Alert.alert('Erro', 'Erro ao editar produto. Tente novamente.');
        }
    };

    const handleProductDelete = async (idProduto) => {
        try {
            const response = await deleteProduct(idProduto, userToken);
            Alert.alert('Sucesso', 'Produto deletado com sucesso');
            await loadPerfil();
        } catch (error) {
            Alert.alert('Erro', 'Erro ao deletar produto. Tente novamente.');
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        loadPerfil();
    };

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
        if (telefone.length === 10) {
            return `(${telefone.substr(0, 2)}) ${telefone.substr(2, 4)}-${telefone.substr(6, 4)}`;
        } else if (telefone.length === 11) {
            return `(${telefone.substr(0, 2)}) ${telefone.substr(2, 5)}-${telefone.substr(7, 4)}`;
        }
        return telefone;
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

            <ScrollView
                style={styles.produtosContainer}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {perfil.produtos.map(produto => (
                    <View key={produto.id} style={styles.produtoItem}>
                        <View style={styles.infoProduto}>
                            <Text style={styles.produtoNome}>{produto.nomeComercial}</Text>
                            <Text style={styles.produtoPreco}>R$ {produto.valorUnidade}</Text>
                        </View>
                        <View style={styles.actions}>
                            <TouchableOpacity
                                onPress={() => {
                                    setProductDetails(produto);
                                    setModalVisible(true);
                                }}
                                style={styles.editButton}
                            >
                                <Ionicons name="create-outline" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleProductDelete(produto.id)}
                                style={styles.deleteButton}
                            >
                                <Ionicons name="trash-outline" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                    <Ionicons name="add-outline" size={24} color="white" />
                    <Text style={styles.addButtonText}>Adicionar Produto</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() =>
                        Alert.alert(
                            'Confirmar Logout',
                            'Tem certeza que deseja sair?',
                            [
                                {
                                    text: 'Cancelar',
                                    style: 'cancel',
                                },
                                {
                                    text: 'Sair',
                                    onPress: () => handleLogout(),
                                    style: 'destructive',
                                },
                            ],
                            { cancelable: true }
                        )
                    }
                >
                    <Ionicons name="log-out-outline" size={24} color="white" />
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Produto</Text>
                        <TextInput
                            placeholder="Nome Comercial"
                            value={productDetails.nomeComercial}
                            onChangeText={text => setProductDetails({ ...productDetails, nomeComercial: text })}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Nome Técnico"
                            value={productDetails.nomeTecnico}
                            onChangeText={text => setProductDetails({ ...productDetails, nomeTecnico: text })}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Descrição"
                            value={productDetails.descricao}
                            onChangeText={text => setProductDetails({ ...productDetails, descricao: text })}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Valor Unidade"
                            value={productDetails.valorUnidade}
                            onChangeText={text => setProductDetails({ ...productDetails, valorUnidade: text })}
                            keyboardType="numeric"
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Peso"
                            value={productDetails.peso}
                            onChangeText={text => setProductDetails({ ...productDetails, peso: text })}
                            keyboardType="numeric"
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Material"
                            value={productDetails.material}
                            onChangeText={text => setProductDetails({ ...productDetails, material: text })}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Dimensões"
                            value={productDetails.dimensoes}
                            onChangeText={text => setProductDetails({ ...productDetails, dimensoes: text })}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Fabricante"
                            value={productDetails.fabricante}
                            onChangeText={text => setProductDetails({ ...productDetails, fabricante: text })}
                            style={styles.input}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (productDetails.id) {
                                        handleProductEdit(productDetails.id);
                                    } else {
                                        handleProductAdd();
                                    }
                                }}
                                style={styles.saveButton}
                            >
                                <Text style={styles.saveButtonText}>Salvar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(false);
                                    setProductDetails({
                                        descricao: '',
                                        valorUnidade: '',
                                        nomeComercial: '',
                                        nomeTecnico: '',
                                        peso: '',
                                        material: '',
                                        dimensoes: '',
                                        fabricante: '',
                                    });
                                }}
                                style={styles.cancelButton}
                            >
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
        padding: 20,
        marginBottom: 20,
        borderRadius: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    descricao: {
        fontSize: 16,
        marginBottom: 10,
    },
    telefoneContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    enderecoContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    icon: {
        marginRight: 10,
    },
    produtosContainer: {
        marginBottom: 20,
    },
    produtoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#E6E4E7',
        marginBottom: 10,
        borderRadius: 10,
    },
    infoProduto: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    produtoNome: {
        fontSize: 16,
        marginRight: 10,
        flexShrink: 1,
    },
    produtoPreco: {
        fontSize: 16,
        fontWeight: 'bold',
        flexShrink: 0,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    editButton: {
        marginRight: 10,
    },
    deleteButton: {},
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    addButton: {
        backgroundColor: '#018ABE',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        marginLeft: 10,
    },
    logoutButton: {
        backgroundColor: '#9c0000',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoutButtonText: {
        color: 'white',
        marginLeft: 10,
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
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    saveButton: {
        backgroundColor: '#018ABE',
        padding: 10,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        marginRight: 10,
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#9c0000',
        padding: 10,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default PerfilDaDistribuidora;
