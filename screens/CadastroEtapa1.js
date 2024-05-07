import React from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import InputStyle from '../components/InputStyle';
import ButtonStyle from '../components/ButtonStyle';

function CadastroEtapa1({ navigation }) {
    return (
        <ImageBackground source={require('../assets/backgroundLogin.png')} style={styles.background}>
            <View style={styles.container}>
                {/* Bolinhas indicando as etapas */}
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
                {/* Inputs */}
                <View style={styles.inputsContainer}>
                    <InputStyle content='Nome de Usuário' appearance={styles.styleInput} />
                    <InputStyle content='Email' appearance={styles.styleInput} />
                    <InputStyle content='Senha' appearance={styles.styleInput} />
                    <InputStyle content='Confirmar Senha' appearance={styles.styleInput} />
                    <InputStyle content='Telefone' appearance={styles.styleInput} />
                    <InputStyle content='CPF/CNPJ' appearance={styles.styleInput} />
                </View>
                {/* Botão para próxima etapa */}
                <View style={styles.buttonContainer}>
                    <ButtonStyle action={() => navigation.navigate('Cadastro Etapa 2')} content='Próximo' />
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
