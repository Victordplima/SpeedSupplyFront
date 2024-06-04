import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PedidosDistribuidora = () => {
    const navigation = useNavigation();

    const [pedidos, setPedidos] = useState([
        { 
            id: 1, 
            mercado: 'Mercado A', 
            data: '2024-06-01 10:30', 
            status: 'Em Analise',
            produtos: [
                { nome: 'P. Forma Sal 450', quantidade: 30 },
                { nome: 'P. Hamburguer c/6 300g', quantidade: 20 },
                { nome: 'P. Abóbora c/12 380g', quantidade: 5 },
                { nome: 'P. Batata c/12 380g', quantidade: 5 },
                { nome: 'P. Petrópolis 450g', quantidade: 10 },
                { nome: 'P. Cachorro Quente c/12 380g', quantidade: 28 }
            ] 
        },
        { 
            id: 2, 
            mercado: 'Mercado B', 
            data: '2024-06-02 14:15', 
            status: 'Aceito',
            produtos: [
                { nome: 'Bisnaguinha Roma 250g', quantidade: 40 },
                { nome: 'P. Cenoura 380g', quantidade: 35 },
                { nome: 'P. Integral 450g', quantidade: 45 },
                { nome: 'P. Integral Light 450g', quantidade: 10 },
                { nome: 'P. Milho 380g', quantidade: 15 },
                { nome: 'Biscoito Povilho Scl. 100g', quantidade: 8 }
            ] 
        },
        { 
            id: 3, 
            mercado: 'Mercado C', 
            data: '2024-06-03 09:45', 
            status: 'Entregue',
            produtos: [
                { nome: 'Rosca Amanteigada', quantidade: 20 },
                { nome: 'P. Forma pra Bolo 300g', quantidade: 50 },
                { nome: 'Biscoito Povilho Scl. 70g', quantidade: 10 },
                { nome: 'P. Hamburguer c/10 550g', quantidade: 15 },
                { nome: 'P. Integral Light 300g', quantidade: 5 },
                { nome: 'P. Hot Dog c/10 500g', quantidade: 10 }
            ] 
        },
        { 
            id: 4, 
            mercado: 'Mercado D', 
            data: '2024-06-04 16:30', 
            status: 'Em Analise',
            produtos: [
                { nome: 'P. Forma Sal 450', quantidade: 50 },
                { nome: 'P. Hamburguer c/6 300g', quantidade: 30 },
                { nome: 'P. Abóbora c/12 380g', quantidade: 20 },
                { nome: 'P. Batata c/12 380g', quantidade: 10 },
                { nome: 'P. Petrópolis 450g', quantidade: 25 },
                { nome: 'P. Cachorro Quente c/12 380g', quantidade: 40 }
            ] 
        }
    ]);

    const handleAccept = (id) => {
        setPedidos((prevPedidos) =>
            prevPedidos.map((pedido) =>
                pedido.id === id ? { ...pedido, status: 'Aceito' } : pedido
            )
        );
    };

    const handleCancel = (id) => {
        setPedidos((prevPedidos) =>
            prevPedidos.map((pedido) =>
                pedido.id === id ? { ...pedido, status: 'Cancelado' } : pedido
            )
        );
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Em Analise':
                return styles.analise;
            case 'Aceito':
                return styles.aceito;
            case 'Entregue':
                return styles.entregue;
            case 'Cancelado':
                return styles.cancelado;
            default:
                return {};
        }
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>Voltar</Text>
            </Pressable>
            <Text style={styles.title}>Pedidos</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {pedidos.map((pedido) => (
                    <View key={pedido.id} style={[styles.card, getStatusStyle(pedido.status)]}>
                        <Text style={styles.text}>Pedido {pedido.id}</Text>
                        <Text style={styles.text}>Mercado: {pedido.mercado}</Text>
                        <Text style={styles.text}>Data: {pedido.data}</Text>
                        <View style={styles.spacing} />
                        {pedido.produtos.map((produto, index) => (
                            <View key={index} style={styles.produto}>
                                <Text style={styles.text}>{produto.nome}</Text>
                                <Text style={styles.text}>Quantidade: {produto.quantidade}</Text>
                            </View>
                        ))}
                        <View style={styles.spacing} />
                        {pedido.status === 'Em Analise' && (
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={[styles.button, styles.acceptButton]}
                                    onPress={() => handleAccept(pedido.id)}
                                >
                                    <Text style={styles.buttonText}>Aceitar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.cancelButton]}
                                    onPress={() => handleCancel(pedido.id)}
                                >
                                    <Text style={styles.buttonText}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        <View style={styles.spacing} />
                        <Text style={styles.text}>Status: {pedido.status}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
    },
    backButtonText: {
        fontSize: 16,
        color: 'blue',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        paddingTop: 10,
    },
    card: {
        backgroundColor: '#ffffff',
        width: 300,
        padding: 20,
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 2, // Add border width to all cards
    },
    analise: {
        borderColor: 'red',
    },
    aceito: {
        borderColor: 'yellow',
    },
    entregue: {
        borderColor: 'green',
    },
    cancelado: {
        borderColor: 'black',
        backgroundColor: 'grey',
    },
    produto: {
        marginTop: 10,
    },
    text: {
        fontSize: 16,
    },
    spacing: {
        height: 10, // You can adjust the height as needed
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    acceptButton: {
        backgroundColor: 'blue',
    },
    cancelButton: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PedidosDistribuidora;
