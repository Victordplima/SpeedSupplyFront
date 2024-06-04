import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import { AuthContext } from '../../context/authContext';
import { sendRequest, getProfileInformation } from '../../utils/http';
import { jwtDecode } from "jwt-decode";

const ConfirmacaoPedido = ({ route, navigation }) => {
    const { idProfile, quantidades, perfil } = route.params;
    const { userToken } = useContext(AuthContext);
    const [dataHora, setDataHora] = useState('');
    const [endereco, setEndereco] = useState('');

    useEffect(() => {
        const now = new Date();
        const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}_${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        setDataHora(formattedDate);

        const fetchEndereco = async () => {
            try {
                const decodedToken = jwtDecode(userToken);
                const idUsuario = decodedToken.idUsuario;
                console.log(idUsuario);
                const profileData = await getProfileInformation(idUsuario, userToken);
                setEndereco(profileData.endereco);
            } catch (error) {
                console.error('Erro ao buscar informações do perfil:', error.message);
            }
        };

        fetchEndereco();
    }, [userToken]);

    const enviarPedido = async () => {
        const arrayProdutos = Object.keys(quantidades).map(id => [id, quantidades[id]]);
        const payload = {
            idDistribuidora: idProfile,
            dataHora,
            idEndereco: endereco,
            arrayProdutos,
        };

        try {
            const response = await sendRequest(payload, userToken);
            Alert.alert('Sucesso', 'Pedido enviado com sucesso!');
            navigation.navigate('Distribuidoras');
        } catch (error) {
            Alert.alert('Erro', 'Erro ao enviar o pedido.');
        }
    };

    const renderItem = ({ item }) => {
        const produto = perfil.produtos.find(p => p.id === item);
        const quantidade = quantidades[item];
        const precoTotal = produto.valorUnidade * quantidade;

        return (
            <View style={styles.card}>
                <Text style={styles.itemText}>{produto.nomeComercial}</Text>
                <Text style={styles.itemText}>Preço Unitário: R$ {produto.valorUnidade.toFixed(2)}</Text>
                <Text style={styles.itemText}>Quantidade: {quantidade}</Text>
                <Text style={styles.itemText}>Preço Total: R$ {precoTotal.toFixed(2)}</Text>
            </View>
        );
    };

    const calcularPrecoTotal = () => {
        let total = 0;
        Object.keys(quantidades).forEach(id => {
            const produto = perfil.produtos.find(p => p.id === id);
            const precoTotal = produto.valorUnidade * quantidades[id];
            total += precoTotal;
        });
        return total.toFixed(2);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Confirme seu Pedido</Text>
            <FlatList
                data={Object.keys(quantidades)}
                keyExtractor={item => item}
                renderItem={renderItem}
            />
            <View style={styles.footer}>
                <Text style={styles.totalText}>Preço Total: R$ {calcularPrecoTotal()}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Endereço"
                    value={endereco}
                    editable={false}
                />
                <TouchableOpacity style={styles.button} onPress={enviarPedido}>
                    <Text style={styles.buttonText}>Enviar Pedido</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#F0F0F0',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    itemText: {
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#018ABE',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 20,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default ConfirmacaoPedido;
