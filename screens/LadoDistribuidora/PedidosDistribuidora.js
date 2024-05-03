import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PedidosDistribuidora = () => {
    const navigation = useNavigation();

    const pedidos = [
        { id: 1, produtos: [{ nome: 'Produto A', valor: 50 }, { nome: 'Produto B', valor: 30 }] },
        { id: 2, produtos: [{ nome: 'Produto C', valor: 20 }, { nome: 'Produto D', valor: 40 }] },
        
        { id: 3, produtos: [{ nome: 'Produto A', valor: 50 }, { nome: 'Produto B', valor: 30 }] },
        { id: 4, produtos: [{ nome: 'Produto C', valor: 20 }, { nome: 'Produto D', valor: 40 }] },
        
        { id: 5, produtos: [{ nome: 'Produto A', valor: 50 }, { nome: 'Produto B', valor: 30 }] },
        { id: 6, produtos: [{ nome: 'Produto C', valor: 20 }, { nome: 'Produto D', valor: 40 }] },
    ];

    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>Voltar</Text>
            </Pressable>
            <Text style={styles.title}>Pedidos</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {pedidos.map((pedido) => (
                    <View key={pedido.id} style={styles.card}>
                        <Text style={styles.text}>Pedido {pedido.id}</Text>
                        {pedido.produtos.map((produto, index) => (
                            <View key={index} style={styles.produto}>
                                <Text style={styles.text}>Produto: {produto.nome}</Text>
                                <Text style={styles.text}>Preço: R$ {produto.valor}</Text>
                            </View>
                        ))}
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
    },
    produto: {
        marginTop: 10,
    },
    text: {
        fontSize: 16,
    },
});

export default PedidosDistribuidora;
