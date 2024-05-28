import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Alert, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import InputStyle from '../components/InputStyle';
import ButtonStyle from '../components/ButtonStyle';
import { signup } from '../utils/http';

function CadastroEtapa2({ navigation, route }) {
    const [addressData, setAddressData] = useState({
        rua: '',
        bairro: '',
        cidade: '',
        cep: '',
        numero: '',
        estado: '',
    });

    const { userData } = route.params;

    const handleSignup = async () => {
        try {
            const fullData = { ...userData, ...addressData };
            console.log('Dados completos para cadastro:', fullData);
            const token = await signup(fullData);
            Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            Alert.alert('Erro', error.message || 'Erro ao cadastrar.');
        }
    };

    return (
        <ImageBackground source={require('../assets/backgroundLogin.png')} style={styles.background}>
            <View style={styles.container}>
                <View style={styles.stepIndicatorContainer}>
                    <View style={styles.stepContainer}>
                        <MaterialIcons name="fiber-manual-record" size={20} color="#D3D3D3" />
                        <Text style={styles.stepDescription}>Etapa 1</Text>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.stepContainer}>
                        <MaterialIcons name="fiber-manual-record" size={20} color="#007AFF" />
                        <Text style={styles.stepDescription}>Etapa 2</Text>
                    </View>
                </View>
                <View style={styles.inputsContainer}>
                    <InputStyle 
                        content='Rua' 
                        appearance={styles.styleInput} 
                        onChangeText={(text) => setAddressData({ ...addressData, rua: text })}
                    />
                    <InputStyle 
                        content='Bairro' 
                        appearance={styles.styleInput} 
                        onChangeText={(text) => setAddressData({ ...addressData, bairro: text })}
                    />
                    <InputStyle 
                        content='Cidade' 
                        appearance={styles.styleInput} 
                        onChangeText={(text) => setAddressData({ ...addressData, cidade: text })}
                    />
                    <InputStyle 
                        content='CEP' 
                        appearance={styles.styleInput} 
                        keyboardType='numeric'
                        onChangeText={(text) => setAddressData({ ...addressData, cep: text })}
                    />
                    <InputStyle 
                        content='Número' 
                        appearance={styles.styleInput} 
                        keyboardType='numeric'
                        onChangeText={(text) => setAddressData({ ...addressData, numero: text })}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <ButtonStyle action={handleSignup} content='Cadastrar' />
                    <View style={{ marginTop: 10 }} />
                    <ButtonStyle action={() => navigation.goBack()} content='Voltar' />
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        flex: 1,
        resizeMode: "cover",
    },
    stepIndicatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    stepContainer: {
        alignItems: 'center',
    },
    stepDescription: {
        marginTop: 5,
        fontSize: 12,
        color: '#707070',
    },
    line: {
        height: 2,
        backgroundColor: '#D3D3D3',
        width: 80,
    },
    inputsContainer: {
        width: '80%',
        marginBottom: '7%',
    },
    styleInput: {
        width: '100%',
        marginBottom: 10,
    },
    buttonContainer: {
        width: '50%',
        alignItems: 'center',
    },
});

export default CadastroEtapa2;
