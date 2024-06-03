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
        // Pegar a data e hora atual formatada como dd/MM/yyyy_HH:mm
        const now = new Date();
        const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}_${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        setDataHora(formattedDate);

        // Obter o endereço do cliente a partir do perfil
        const fetchEndereco = async () => {
            try {
                // Decodificar o token para obter o ID do usuário
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Confirme seu Pedido</Text>
            <FlatList
                data={Object.keys(quantidades)}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.itemText}>{perfil.produtos.find(p => p.id === item).nomeComercial}: {quantidades[item]}</Text>
                    </View>
                )}
            />
            <TextInput
                style={styles.input}
                placeholder="Data e Hora"
                value={dataHora}
                editable={false}  // Tornar o campo não editável
            />
            <TextInput
                style={styles.input}
                placeholder="Endereço"
                value={endereco}
                editable={false}  // Tornar o campo não editável
            />
            <TouchableOpacity style={styles.button} onPress={enviarPedido}>
                <Text style={styles.buttonText}>Enviar Pedido</Text>
            </TouchableOpacity>
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
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
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
});

export default ConfirmacaoPedido;
