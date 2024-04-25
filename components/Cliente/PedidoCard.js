import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const PedidoCard = ({ nomeEmpresa, idPedido, dataHoraEntrega, statusPedido, endereco, nomeProduto, quantidadeProduto }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpansion = () => {
        setExpanded(!expanded);
    };

    return (
        <Pressable
            android_ripple={{ color: "#CCC" }}
            style={[styles.card, expanded && styles.expandedCard]}
            onPress={toggleExpansion}
        >
            <View style={styles.topContent}>
                <View style={styles.leftContent}>
                    <Text style={styles.text}>{nomeEmpresa}</Text>
                </View>
                <View style={styles.rightContent}>
                    <Text style={styles.textId}>#{idPedido}</Text>
                </View>
            </View>
            <View style={styles.bottomContent}>
                <Text style={styles.subtitle}>Data e hora de entrega:</Text>
                <Text style={styles.bottomText}>{dataHoraEntrega}</Text>
            </View>
            {expanded && (
                <View style={styles.expandedContent}>
                    <Text style={styles.subtitle}>Status do Pedido:</Text>
                    <Text style={styles.bottomText}>{statusPedido}</Text>
                    <Text style={styles.subtitle}>Endereço:</Text>
                    <Text style={styles.bottomText}>{endereco}</Text>
                    <Text style={styles.subtitle}>Nome do Produto:</Text>
                    <Text style={styles.bottomText}>{nomeProduto}</Text>
                    <Text style={styles.subtitle}>Quantidade do Produto:</Text>
                    <Text style={styles.bottomText}>{quantidadeProduto}</Text>
                    <View style={styles.buttonsContainer}>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </Pressable>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>Reagendar</Text>
                        </Pressable>
                    </View>
                </View>
            )}

        </Pressable >
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        margin: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    expandedCard: {
        height: 'auto',
    },
    topContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    leftContent: {
        flex: 1,
    },
    rightContent: {
        marginLeft: 10,
    },
    bottomContent: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: 20,
    },
    expandedContent: {
        marginTop: 20,
    },
    subtitle: {
        fontSize: 14,
        color: 'gray',
        //fontWeight: 'bold',
    },
    text: {
        fontSize: 18,
        //fontWeight: 'bold',
    },
    textId: {
        color: 'gray',
        fontSize: 13,
    },
    bottomText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },    
    button: {
        backgroundColor: 'transparent',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginTop: 5,
        marginRight: 10,
        borderColor: '#007AFF',
        borderWidth: 2,
        borderRadius: 10,
    },
    buttonText: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
});

export default PedidoCard;
