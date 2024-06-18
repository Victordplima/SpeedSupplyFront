import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Modal, Alert, RefreshControl, Image, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/authContext';
import { getProfileInformation, addProduct, editProduct, deleteProduct } from '../../utils/http';
import { jwtDecode } from 'jwt-decode';
import profileImage from '../../assets/foto.png';

const PerfilDaDistribuidora = ({ navigation }) => {
    const { userToken, logout } = useContext(AuthContext);
    const [perfil, setPerfil] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
    const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal de logout
    const [modalAddVisible, setModalAddVisible] = useState(false); // Estado para controlar a visibilidade do modal de adicionar produto
    const [modalEditVisible, setModalEditVisible] = useState(false); // Estado para controlar a visibilidade do modal de editar produto
    const [idProdutoEditar, setIdProdutoEditar] = useState(null); // Estado para armazenar o ID do produto a ser editado

    const { idUsuario: idProfile } = jwtDecode(userToken); // Extraído do token usando jwtDecode

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
            setModalAddVisible(false); // Fechar modal de adicionar produto após adicionar
            await loadPerfil();
        } catch (error) {
            Alert.alert('Erro', 'Erro ao adicionar produto. Tente novamente.');
        }
    };

    const handleProductEdit = async () => {
        try {
            const response = await editProduct(idProdutoEditar, productDetails, userToken);
            Alert.alert('Sucesso', 'Produto editado com sucesso');
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
            setModalEditVisible(false); // Fechar modal de editar produto após editar
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
                <Image source={profileImage} style={styles.profileImage} />
                <View style={styles.headerRight}>
                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => setModalVisible(true)} // Abre o modal de logout ao pressionar os três pontinhos
                    >
                        <Ionicons name="ellipsis-vertical" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>{perfil.nome}</Text>
                <Text style={styles.descricao}>{perfil.descricao}</Text>
                <View style={styles.telefoneContainer}>
                    <Ionicons name="call-outline" size={24} color="white" style={styles.icon} />
                    <Text style={styles.telefone}>{formatarTelefone(perfil.telefone)}</Text>
                </View>
                <View style={styles.enderecoContainer}>
                    <Ionicons name="location-outline" size={24} color="white" style={styles.icon} />
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
                                    setIdProdutoEditar(produto.id);
                                    setProductDetails(produto);
                                    setModalEditVisible(true);
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
                <TouchableOpacity style={styles.addButton} onPress={() => setModalAddVisible(true)}>
                    <Ionicons name="add-outline" size={24} color="white" />
                    <Text style={styles.addButtonText}>Adicionar Produto</Text>
                </TouchableOpacity>
            </View>

            {/* Modal de Logout */}
            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity
                            style={styles.modalBackground}
                            onPress={() => setModalVisible(false)}
                        />
                        <View style={styles.modalContent}>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(false);
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
                                                onPress: handleLogout,
                                                style: 'destructive',
                                            },
                                        ],
                                        { cancelable: true }
                                    );
                                }}
                                style={styles.logoutButtonModal}
                            >
                                <Ionicons name="log-out-outline" size={24} color="#9c0000" />
                                <Text style={styles.logoutButtonText}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* Modal de Adicionar Produto */}
            <Modal visible={modalAddVisible} transparent={true} animationType="slide">
                <TouchableWithoutFeedback onPress={() => setModalAddVisible(false)}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity
                            style={styles.modalBackground}
                            onPress={() => setModalAddVisible(false)}
                        />
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Adicionar Produto</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Descrição"
                                value={productDetails.descricao}
                                onChangeText={(text) => setProductDetails({ ...productDetails, descricao: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Valor por Unidade"
                                value={productDetails.valorUnidade}
                                onChangeText={(text) => setProductDetails({ ...productDetails, valorUnidade: text })}
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Nome Comercial"
                                value={productDetails.nomeComercial}
                                onChangeText={(text) => setProductDetails({ ...productDetails, nomeComercial: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Nome Técnico"
                                value={productDetails.nomeTecnico}
                                onChangeText={(text) => setProductDetails({ ...productDetails, nomeTecnico: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Peso"
                                value={productDetails.peso}
                                onChangeText={(text) => setProductDetails({ ...productDetails, peso: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Material"
                                value={productDetails.material}
                                onChangeText={(text) => setProductDetails({ ...productDetails, material: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Dimensões"
                                value={productDetails.dimensoes}
                                onChangeText={(text) => setProductDetails({ ...productDetails, dimensoes: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Fabricante"
                                value={productDetails.fabricante}
                                onChangeText={(text) => setProductDetails({ ...productDetails, fabricante: text })}
                            />
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={() => handleProductAdd()}
                            >
                                <Text style={styles.saveButtonText}>Adicionar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* Modal de Editar Produto */}
            <Modal visible={modalEditVisible} transparent={true} animationType="slide">
                <TouchableWithoutFeedback onPress={() => setModalEditVisible(false)}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity
                            style={styles.modalBackground}
                            onPress={() => setModalEditVisible(false)}
                        />
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Editar Produto</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Descrição"
                                value={productDetails.descricao}
                                onChangeText={(text) => setProductDetails({ ...productDetails, descricao: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Valor por Unidade"
                                value={productDetails.valorUnidade}
                                onChangeText={(text) => setProductDetails({ ...productDetails, valorUnidade: text })}
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Nome Comercial"
                                value={productDetails.nomeComercial}
                                onChangeText={(text) => setProductDetails({ ...productDetails, nomeComercial: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Nome Técnico"
                                value={productDetails.nomeTecnico}
                                onChangeText={(text) => setProductDetails({ ...productDetails, nomeTecnico: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Peso"
                                value={productDetails.peso}
                                onChangeText={(text) => setProductDetails({ ...productDetails, peso: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Material"
                                value={productDetails.material}
                                onChangeText={(text) => setProductDetails({ ...productDetails, material: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Dimensões"
                                value={productDetails.dimensoes}
                                onChangeText={(text) => setProductDetails({ ...productDetails, dimensoes: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Fabricante"
                                value={productDetails.fabricante}
                                onChangeText={(text) => setProductDetails({ ...productDetails, fabricante: text })}
                            />
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={() => handleProductEdit()}
                            >
                                <Text style={styles.saveButtonText}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#018ABE',
        padding: 20,
    },
    informacoes: {
        backgroundColor: '#018ABE',
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
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    headerRight: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    menuButton: {
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    descricao: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        marginBottom: 10,
    },
    telefoneContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    icon: {
        marginRight: 5,
    },
    telefone: {
        color: 'white',
        fontSize: 16,
    },
    enderecoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    endereco: {
        color: 'white',
        fontSize: 16,
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
        flex: 1,
    },
    produtoNome: {
        fontSize: 18,
    },
    produtoPreco: {
        fontSize: 16,
        color: '#018ABE',
        marginTop: 5,
    },
    actions: {
        flexDirection: 'row',
    },
    editButton: {
        marginRight: 15,
    },
    deleteButton: {

    },
    footer: {
        //padding: 20,
        //backgroundColor: '#018ABE',
        alignItems: 'center',
    },
    addButton: {
        flexDirection: 'row',
        backgroundColor: '#018ABE',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        marginLeft: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalBackground: {
        flex: 1,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: '#018ABE',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
    },
    logoutButtonModal: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    logoutButtonText: {
        color: '#9c0000',
        fontSize: 18,
        marginLeft: 10,
    },
    errorText: {
        flex: 1,
        backgroundColor: '#018ABE',
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});

export default PerfilDaDistribuidora;
