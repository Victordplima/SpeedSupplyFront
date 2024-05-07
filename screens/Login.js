import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import InputStyle from '../components/InputStyle.js';
import ButtonStyle from '../components/ButtonStyle.js';

function Login({ navigation }) {
    return (
        <ImageBackground source={require('../assets/backgroundLogin.png')} style={styles.background}>
            <View>
                <Text style={styles.title}>Bem-vindo de volta!</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <InputStyle content='Email' appearance={styles.styleInput} />
                    <InputStyle content='Senha' appearance={styles.styleInput} />
                </View>


                <ButtonStyle content='Logar' />
                <View style={{ marginVertical: 10 }} />
                <ButtonStyle content='Esqueci a senha' appearance={styles.forgotPasswordButton} />


                <View style={styles.createAccountContainer}>
                    <Text style={{ fontSize: 16 }}>Não possui uma conta?</Text>
                    <ButtonStyle
                        action={() => navigation.navigate('Cadastro')} 
                        appearance={styles.forgotPasswordButton}
                        styleContent={styles.createAccountText}
                        content='Criar conta'
                    />
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
    },
    title: {
        marginTop: '10%',
        fontSize: 28,
        marginLeft: '10%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        marginBottom: '8%',
        width: '80%',
    },
    styleInput: {
        marginBottom: '7%',
    },
    forgotPasswordButton: {
        color: 'black',
        alignItems: 'center',
        padding: '3%',
    },
    createAccountContainer: {
        marginTop: '20%',
        alignItems: 'center',
    },
    createAccountText: {
        fontWeight: 'bold',
        color: '#007EA7',
        fontSize: 16,
    },
});

export default Login;