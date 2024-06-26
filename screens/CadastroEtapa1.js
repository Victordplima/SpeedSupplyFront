import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Text, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import InputStyle from '../components/InputStyle';
import ButtonStyle from '../components/ButtonStyle';

function CadastroEtapa1({ navigation }) {
    const [userData, setUserData] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        telefoneCelular: '',
        cnpj_cpf: '',
        descricao: '', // Assuming this field should be included
    });

    const handleNextStep = () => {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
        const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
        const phoneRegex = /^\d{11}$/;

        if (cpfRegex.test(userData.cnpj_cpf)) {
            userData.tipoUsuario = 'cliente';
        } else if (cnpjRegex.test(userData.cnpj_cpf)) {
            userData.tipoUsuario = 'distribuidora';
        } else {
            Alert.alert('Erro', 'CPF ou CNPJ inválido.');
            return;
        }

        if (userData.senha !== userData.confirmarSenha) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }

        if (!phoneRegex.test(userData.telefoneCelular)) {
            Alert.alert('Erro', 'Número de telefone inválido.');
            return;
        }

        navigation.navigate('Cadastro Etapa 2', { userData });
    };

    return (
        <ImageBackground source={require('../assets/backgroundLogin.png')} style={styles.background}>
            <View style={styles.container}>
                <View style={styles.stepIndicatorContainer}>
                    <View style={styles.stepContainer}>
                        <MaterialIcons name="fiber-manual-record" size={20} color="#007AFF" />
                        <Text style={styles.stepDescription}>Etapa 1</Text>
                    </View>
                    <View style={styles.line} />
                    <View style={styles.stepContainer}>
                        <MaterialIcons name="fiber-manual-record" size={20} color="#D3D3D3" />
                        <Text style={styles.stepDescription}>Etapa 2</Text>
                    </View>
                </View>
                <View style={styles.inputsContainer}>
                    <InputStyle
                        content='Nome de Usuário'
                        appearance={styles.styleInput}
                        onChangeText={(text) => setUserData({ ...userData, nome: text })}
                    />
                    <InputStyle
                        content='Email'
                        appearance={styles.styleInput}
                        keyboardType='email-address'
                        onChangeText={(text) => setUserData({ ...userData, email: text })}
                    />
                    <InputStyle
                        content='Senha'
                        appearance={styles.styleInput}
                        secureTextEntry
                        onChangeText={(text) => setUserData({ ...userData, senha: text })}
                    />
                    <InputStyle
                        content='Confirmar Senha'
                        appearance={styles.styleInput}
                        secureTextEntry
                        onChangeText={(text) => setUserData({ ...userData, confirmarSenha: text })}
                    />
                    <InputStyle
                        content='Telefone'
                        appearance={styles.styleInput}
                        keyboardType='phone-pad'
                        onChangeText={(text) => setUserData({ ...userData, telefoneCelular: text })}
                    />
                    <InputStyle
                        content='CPF/CNPJ'
                        appearance={styles.styleInput}
                        keyboardType='numeric'
                        onChangeText={(text) => setUserData({ ...userData, cnpj_cpf: text })}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <ButtonStyle action={handleNextStep} content='Próximo' />
                </View>
                <View style={styles.createAccountContainer}>
                    <Text style={{ fontSize: 16 }}>Já possui uma conta?</Text>
                    <ButtonStyle
                        action={() => navigation.navigate('Login')}
                        appearance={styles.forgotPasswordButton}
                        styleContent={styles.createAccountText}
                        content='Logar'
                    />
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
    createAccountContainer: {
        marginTop: '12%',
        alignItems: 'center',
    },
    createAccountText: {
        fontWeight: 'bold',
        color: '#007EA7',
        fontSize: 16,
    },
    forgotPasswordButton: {
        color: 'black',
        alignItems: 'center',
        padding: '3%',
    },
});

export default CadastroEtapa1;
