import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, Modal, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../context/authContext';
import { cancelRequest } from '../../utils/http';

const PedidoCard = ({ nomeEmpresa, idPedido, dataHoraPedido, statusPedido, endereco, nomeProduto, quantidadeProduto }) => {
    const [expanded, setExpanded] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const { userToken } = useContext(AuthContext);

    const toggleExpansion = () => {
        setExpanded(!expanded);
    };

    const handleCancelPress = () => {
        setModalVisible(true);
    };

    const confirmCancel = async () => {
        try {
            await cancelRequest(idPedido, userToken);
            Alert.alert('Sucesso', 'Pedido cancelado com sucesso!');
        } catch (error) {
            Alert.alert('Erro', error.message || 'Erro ao cancelar o pedido');
        } finally {
            setModalVisible(false);
        }
    };

    return (
        <>
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
                    <Text style={styles.subtitle}>Data e hora do pedido:</Text>
                    <Text style={styles.bottomText}>{dataHoraPedido}</Text>
                </View>
                {expanded && (
                    <View style={styles.expandedContent}>
                        <Text style={styles.subtitle}>Endereço:</Text>
                        <Text style={styles.bottomText}>{endereco}</Text>
                        <Text style={styles.subtitle}>Nome do Produto:</Text>
                        <Text style={styles.bottomText}>{nomeProduto}</Text>
                        <Text style={styles.subtitle}>Quantidade do Produto:</Text>
                        <Text style={styles.bottomText}>{quantidadeProduto}</Text>
                        <View style={styles.buttonsContainer}>
                            <Pressable style={[styles.button, styles.cancelButton]} onPress={handleCancelPress}>
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
            </Pressable>

            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Tem certeza que deseja cancelar o pedido?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.modalButtonYes]}
                                onPress={confirmCancel}
                            >
                                <Text style={styles.modalButtonYesText}>Sim</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.modalButtonNo]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalButtonNoText}>Não</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
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
    },
    text: {
        fontSize: 18,
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
        justifyContent: 'flex-end',
        marginTop: 10,
        width: '100%',
    },
    button: {
        backgroundColor: 'transparent',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginTop: 5,
        borderWidth: 2,
        borderRadius: 10,
    },
    cancelButton: {
        borderColor: '#bf2419',
    },
    buttonText: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
    cancelButtonText: {
        color: '#bf2419',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    modalButton: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    modalButtonYes: {
        backgroundColor: 'transparent',
        borderColor: '#bf2419',
        borderWidth: 2,
    },
    modalButtonYesText: {
        color: '#bf2419',
        fontWeight: 'bold',
    },
    modalButtonNo: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    modalButtonNoText: {
        color: 'black', // Alternativa para cinza: color: 'gray'
        fontWeight: 'bold',
    },
});

export default PedidoCard;
