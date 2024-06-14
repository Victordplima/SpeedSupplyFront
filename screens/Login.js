import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import InputStyle from '../components/InputStyle.js';
import ButtonStyle from '../components/ButtonStyle.js';
import { login as authLogin } from '../utils/http.js'; // Importar o serviço de autenticação
import { AuthContext } from '../context/authContext'; // Importar o AuthContext

function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        setLoading(true); // Iniciar o carregamento
        try {
            const token = await authLogin(email, senha); // O login retorna apenas o token
            await login(token); // Passa o token para o contexto de autenticação
            Alert.alert('Sucesso', 'Login realizado com sucesso!');
        } catch (error) {
            Alert.alert('Erro', error.message || 'Erro ao fazer login');
        } finally {
            setLoading(false); // Finalizar o carregamento
        }
    };

    return (
        <ImageBackground source={require('../assets/backgroundLogin.png')} style={styles.background}>
            <View>
                <Text style={styles.title}>Bem-vindo de volta!</Text>
            </View>
            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color="#007EA7" />
                ) : (
                    <>
                        <View style={styles.inputContainer}>
                            <InputStyle
                                content='Email'
                                appearance={styles.styleInput}
                                onChangeText={setEmail}
                            />
                            <InputStyle
                                content='Senha'
                                appearance={styles.styleInput}
                                secureTextEntry
                                onChangeText={setSenha}
                            />
                        </View>

                        <ButtonStyle content='Logar' action={handleLogin} />
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
                    </>
                )}
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
