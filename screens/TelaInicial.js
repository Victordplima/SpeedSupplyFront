import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import ButtonStyle from '../components/ButtonStyle';

function TelaInicial({ navigation }) {
    return (
        <ImageBackground source={require('../assets/backgroundLogin.png')} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.welcomeText}>Bem-vindo ao nosso aplicativo!</Text>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/logo.png')} style={styles.logo} />
                </View>
                <View style={styles.buttonContainer}>
                    <ButtonStyle action={() => navigation.navigate('Login')} content='Logar' />
                    <View style={{ marginVertical: 10 }} />
                    <ButtonStyle action={() => navigation.navigate('Cadastro')} content='Cadastrar' />
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    logoContainer: {
        marginBottom: 40,
    },
    logo: {
        width: 200,
        height: 200,
    },
    buttonContainer: {
        alignItems: 'center',
    },
});

export default TelaInicial;
