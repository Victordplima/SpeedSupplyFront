import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions } from 'react-native';

const ProdutosDistribuidora = ({ navigation }) => {
    const marca = "Roma Alimentos";
    const pedidosAceitos = 15;

    const navigateToPedidos = () => {
        navigation.navigate('PedidosDistribuidora');
    };

    const produtos = [
        { nome: 'P. Forma Sal 450', quantidade: 300 },
        { nome: 'P. Hamburguer c/6 300g', quantidade: 100 },
        { nome: 'P. Abóbora c/12 380g', quantidade: 140 },
        { nome: 'P. Batata c/12 380g', quantidade: 56 },
        { nome: 'P. Petrópolis 450g', quantidade: 100 },
        { nome: 'P. Cachorro Quente c/12 380g', quantidade: 140 },
        { nome: 'Bisnaguinha Roma 250g', quantidade: 120 },
        { nome: 'P. Cenoura 380g', quantidade: 140 },
        { nome: 'P. Integral 450g', quantidade: 200 },
        { nome: 'P. Integral Light 450g', quantidade: 50 },
        { nome: 'P. Milho 380g', quantidade: 56 },
        { nome: 'Biscoito Povilho Scl. 100g', quantidade: 40 },
        { nome: 'Rosca Amanteigada', quantidade: 100 },
        { nome: 'P. Forma pra Bolo 300g', quantidade: 150 },
        { nome: 'Biscoito Povilho Scl. 70g', quantidade: 20 },
        { nome: 'P. Hamburguer c/10 550g', quantidade: 70 },
        { nome: 'P. Integral Light 300g', quantidade: 15 },
        { nome: 'P. Hot Dog c/10 500g', quantidade: 70 },
    ];

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
                        <Text style={styles.text}>Ver Pedidos</Text>
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
                        </View>
                    </View>
                ))}
            </ScrollView>
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
        paddingTop: 15,
        paddingBottom: 100,
        marginBottom: 15,
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
    },
    text: {
        fontSize: 16,
    },
    nomeProduto: {
        fontSize: 16,
    },
    buttonContainer: {
        paddingTop: 15,
        width: '100%',
        alignItems: 'center',
    },
    pedidosAceitosText: {
        fontSize: 16,
    },
    pedidosArea: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
    },
    produtoItemPar: {
        backgroundColor: '#f9f9f9',
    },
    produtoItemImpar: {
        backgroundColor: '#e0e0e0',
    },
});

export default ProdutosDistribuidora;
