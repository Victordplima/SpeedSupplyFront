import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, Dimensions, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Carga = ({ navigation }) => {
    const marca = "Roma Alimentos";
    const [pedidosAceitos, setPedidosAceitos] = useState(15);
    const [produtos, setProdutos] = useState([]);
    const [novoProdutoNome, setNovoProdutoNome] = useState('');
    const [novoProdutoQuantidade, setNovoProdutoQuantidade] = useState('');

    useEffect(() => {
        // Carregar produtos do AsyncStorage ao montar o componente
        loadProdutosFromStorage();
    }, []);

    useEffect(() => {
        // Salvar produtos no AsyncStorage sempre que houver alterações
        saveProdutosToStorage();
    }, [produtos]);

    const loadProdutosFromStorage = async () => {
        try {
            const produtosFromStorage = await AsyncStorage.getItem('produtos');
            if (produtosFromStorage !== null) {
                setProdutos(JSON.parse(produtosFromStorage));
            }
        } catch (error) {
            console.error('Erro ao carregar produtos do AsyncStorage:', error);
        }
    };

    const saveProdutosToStorage = async () => {
        try {
            await AsyncStorage.setItem('produtos', JSON.stringify(produtos));
        } catch (error) {
            console.error('Erro ao salvar produtos no AsyncStorage:', error);
        }
    };

    const handleAdicionarProduto = () => {
        if (novoProdutoNome.trim() === '' || isNaN(parseInt(novoProdutoQuantidade, 10))) {
            Alert.alert('Erro', 'Por favor, preencha nome e quantidade válida do produto.');
            return;
        }

        const quantidade = parseInt(novoProdutoQuantidade, 10);

        const novoProduto = {
            nome: novoProdutoNome,
            quantidade,
        };

        setProdutos([...produtos, novoProduto]);
        setNovoProdutoNome('');
        setNovoProdutoQuantidade('');
    };

    const handleRemoverProduto = (index) => {
        const novosProdutos = [...produtos];
        novosProdutos[index].quantidade -= 1;

        if (novosProdutos[index].quantidade <= 0) {
            novosProdutos[index].quantidade = 0; // Ajuste para não permitir quantidades negativas
        }

        setProdutos(novosProdutos);
    };

    const handleRemoverDezProduto = (index) => {
        const novosProdutos = [...produtos];
        novosProdutos[index].quantidade -= 10;

        if (novosProdutos[index].quantidade <= 0) {
            novosProdutos[index].quantidade = 0; // Ajuste para não permitir quantidades negativas
        }

        setProdutos(novosProdutos);
    };

    const handleLimparProdutos = () => {
        Alert.alert(
            'Limpar Produtos',
            'Tem certeza que deseja limpar todos os produtos?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Confirmar',
                    onPress: () => {
                        setProdutos([]);
                        AsyncStorage.removeItem('produtos');
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const navigateToPedidos = () => {
        navigation.navigate('PedidosDistribuidora');
    };

    const screenHeight = Dimensions.get('window').height;
    const marginTopValue = screenHeight * 0.01;

    return (
        <View style={styles.container}>
            <View style={[styles.header, { marginTop: marginTopValue }]}>
                <Text style={styles.headerText}>{marca}</Text>
                <View style={styles.linha} />
                <Text style={styles.pedidosAceitosText}>Pedidos Aceitos: {pedidosAceitos}</Text>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.pedidosArea} onPress={navigateToPedidos}>
                        <Text style={styles.textWhite}>Ver Pedidos</Text>
                    </Pressable>
                    <Pressable style={styles.limparButton} onPress={handleLimparProdutos}>
                        <Text style={styles.textWhite}>Limpar Produtos</Text>
                    </Pressable>
                </View>
            </View>

            <ScrollView style={styles.scrollContainer}>
                {produtos.map((produto, index) => (
                    <View key={index} style={[styles.produtoItem, index % 2 === 0 ? styles.produtoItemPar : styles.produtoItemImpar]}>
                        <View style={styles.produtoText}>
                            <Text style={styles.nomeProduto}>{produto.nome}</Text>
                        </View>
                        <View style={styles.quantidadeText}>
                            <Text style={styles.text}>{produto.quantidade}</Text>
                            <Pressable onPress={() => handleRemoverProduto(index)} style={styles.removerButton}>
                                <Text style={styles.removerButtonText}>-1</Text>
                            </Pressable>
                            <Pressable onPress={() => handleRemoverDezProduto(index)} style={styles.removerButton}>
                                <Text style={styles.removerButtonText}>-10</Text>
                            </Pressable>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.adicionarContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do Produto"
                    value={novoProdutoNome}
                    onChangeText={setNovoProdutoNome}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Quantidade"
                    value={novoProdutoQuantidade}
                    onChangeText={setNovoProdutoQuantidade}
                    keyboardType="numeric"
                />
                <Pressable style={styles.adicionarButton} onPress={handleAdicionarProduto}>
                    <Text style={styles.adicionarButtonText}>Adicionar Produto</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    linha: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        width: '100%',
        marginTop: 5,
    },
    header: {
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    scrollContainer: {
        flex: 1,
        width: '100%',
    },
    produtoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    produtoText: {
        flex: 1,
        alignItems: 'flex-start',
    },
    quantidadeText: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
    },
    textWhite: {
        fontSize: 16,
        color: 'white'
    },
    nomeProduto: {
        fontSize: 16,
    },
    buttonContainer: {
        paddingTop: 15,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    pedidosAceitosText: {
        fontSize: 16,
    },
    pedidosArea: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
    },
    limparButton: {
        backgroundColor: '#960000',
        padding: 10,
        borderRadius: 5,
    },
    produtoItemPar: {
        backgroundColor: '#f9f9f9',
    },
    produtoItemImpar: {
        backgroundColor: '#e0e0e0',
    },
    adicionarContainer: {
        padding: 20,
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    adicionarButton: {
        backgroundColor: '#018ABE',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    adicionarButtonText: {
        color: 'white',
        fontSize: 16,
    },
    removerButton: {
        paddingVertical: 5,
        marginLeft: 10,
    },
    removerButtonText: {
        color: '#960000',
        fontSize: 12,
    },
});

export default Carga;
