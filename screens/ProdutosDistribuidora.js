import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';

const ProdutosDistribuidora = ({ navigation }) => {
    const marca = "José dos macarrao";
    const pedidosAceitos = 15;

    const navigateToPedidos = () => {
        navigation.navigate('PedidosDistribuidora');
    };

    const produtos = [
        { nome: 'Produto A', quantidade: 10 },
        { nome: 'Produto B', quantidade: 10 },
        { nome: 'Produto A', quantidade: 10 },
        { nome: 'Produto B', quantidade: 5 },
        { nome: 'Produto A', quantidade: 10 },
        { nome: 'Produto B', quantidade: 5 },
        { nome: 'Produto A', quantidade: 10 },
        { nome: 'Produto B', quantidade: 5 },
        { nome: 'Produto A', quantidade: 10 },
        { nome: 'Produto B', quantidade: 5 },
        { nome: 'Produto A', quantidade: 10 },
        { nome: 'Produto B', quantidade: 5 },
        { nome: 'Produto A', quantidade: 10 },
        { nome: 'Produto B', quantidade: 5 },
        { nome: 'Produto A', quantidade: 10 },
        { nome: 'Produto B', quantidade: 5 },
        { nome: 'Produto A', quantidade: 10 },
        { nome: 'Produto B', quantidade: 5 },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
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
