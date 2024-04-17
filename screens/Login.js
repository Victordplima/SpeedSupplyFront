import React from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ImageBackground } from 'react-native';

function Login() {
    return (
        <ImageBackground source={require('../assets/backgroundLogin.png')} style={styles.background}>
            <View>
                <Text style={styles.title}>Login</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.styleInput} placeholder='Email' />
                    <TextInput style={styles.styleInput} placeholder='Senha' />
                </View>

                <View style={styles.buttonContainer}>
                    <View style={styles.buttonWrapper}>
                        <Pressable style={styles.loginButton}>
                            <Text style={styles.textButton}>Logar</Text>
                        </Pressable>
                    </View>
                    <View style={{ marginVertical: 10 }} />
                    <Pressable style={styles.forgotPasswordButton}>
                        <Text style={styles.textButton}>Esqueci a senha</Text>
                    </Pressable>
                </View>

                <View style={styles.createAccountContainer}>
                    <Text style={styles.createAccountText}>Não possui uma conta?</Text>
                    <Pressable onPress={() => console.log('Criar conta clicado')}>
                        <Text style={[styles.createAccountText, styles.createAccountLink]}>Criar conta</Text>
                    </Pressable>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        //justifyContent: "center"
    },
    container: {
        //paddingTop: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginTop: 50,
        fontSize: 28,
        //textAlign: 'left', // Alinha o texto à esquerda
        //justifyContent: flex-start,
        marginLeft: '10%', // Adiciona um espaço à esquerda para melhor visualização
    },
    inputContainer: {
        marginBottom: 20,
        width: '80%',
    },
    styleInput: {
        borderColor: '#000000',
        borderBottomWidth: 2,
        height: 40,
        marginBottom: 20,
    },
    buttonContainer: {
        width: '80%',
    },
    loginButton: {
        backgroundColor: '#007EA7',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
    },
    forgotPasswordButton: {
        color: 'black',
        alignItems: 'center',
        padding: 10,
    },
    textButton: {
        fontSize: 16,
    },
    createAccountContainer: {
        marginTop: '20%',
        alignItems: 'center',
    },
    createAccountText: {
        fontSize: 16,
    },
    createAccountLink: {
        fontWeight: 'bold',
        color: '#007EA7'
    },
});

export default Login;
