import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const PedidoCardDistribuidora = ({ nomeCliente, idPedido, rua, bairro, numero }) => {
    return (
        <Pressable
            android_ripple={{ color: "#CCC" }}
            style={styles.card}
        >
            <View style={styles.topContent}>
                <View style={styles.leftContent}>
                    <Text style={styles.text}>{nomeCliente}</Text>
                </View>
                <View style={styles.rightContent}>
                    <Text style={styles.textId}>#{idPedido}</Text>
                </View>
            </View>
            <View style={styles.bottomContent}>
                <Text style={styles.subtitle}>Endereço:</Text>
                <Text style={styles.bottomText}>Rua: <Text style={styles.endereçoText}>{rua}</Text></Text>
                <Text style={styles.bottomText}>Bairro: <Text style={styles.endereçoText}>{bairro}</Text></Text>
                <Text style={styles.bottomText}>Número: <Text style={styles.endereçoText}>{numero}</Text></Text>
            </View>
        </Pressable>
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
    subtitle: {
        fontSize: 14,
        color: 'gray',
    },
    text: {
        fontSize: 18,
        color:'black',
    },
    textId:{
        color: 'gray',
        fontSize: 13,
    },
    bottomText: {
        fontSize: 14,
        //fontWeight: 'bold',
    },
    endereçoText:{
        fontSize:14,
        fontWeight: 'bold',
    }
});

export default PedidoCardDistribuidora;
