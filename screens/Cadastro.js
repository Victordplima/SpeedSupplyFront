import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Text, Alert, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ButtonStyle from '../components/ButtonStyle';
import { signup } from '../utils/http'; // Verifique se o caminho do arquivo está correto
import InputStyle from '../components/InputStyle';

function Cadastro({ navigation }) {
    const [userData, setUserData] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        tipoUsuario: '',
        cnpj_cpf: '',
        descricao: '',
        telefoneCelular: '',
        estado: '', // Novo campo estado
        cidade: '',
        bairro: '',
        rua: '',
        numero: '',
        cep: ''
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const handleNextStep = () => {
        if (step === 1) {
            if (!userData.tipoUsuario) {
                Alert.alert('Erro', 'Selecione um tipo de usuário.');
                return;
            }
            setStep(2);
        } else {
            // Validação de senha, etc.
            const passwordRegex = /^(?=.*[A-Z]).{8,}$/;

            if (!passwordRegex.test(userData.senha)) {
                Alert.alert('Erro', 'A senha deve ter pelo menos 8 caracteres e incluir uma letra maiúscula.');
                return;
            }

            if (userData.senha !== userData.confirmarSenha) {
                Alert.alert('Erro', 'As senhas não coincidem.');
                return;
            }

            // Verifica se todos os campos obrigatórios estão preenchidos
            if (!userData.estado || !userData.cidade || !userData.bairro || !userData.rua || !userData.numero || !userData.cep) {
                Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
                return;
            }

            handleSignup();
        }
    };

    const handleSignup = async () => {
        setIsLoading(true);

        try {
            const token = await signup(userData);
            setIsLoading(false);
            Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
            navigation.navigate('Login');
        } catch (error) {
            setIsLoading(false);
            console.error('Erro ao cadastrar:', error);
            Alert.alert('Erro', error.message || 'Erro ao cadastrar.');
        }
    };

    const pickImage = async () => {
        // Implemente a lógica para escolher uma imagem
    };

    return (
        <ImageBackground source={require('../assets/backgroundLogin.png')} style={styles.background}>
            <ScrollView contentContainerStyle={styles.container}>
                {step === 1 ? (
                    <>
                        <Text style={styles.title}>Escolha o Tipo de Usuário</Text>
                        <View style={styles.cardsContainer}>
                            <TouchableOpacity
                                style={[styles.card, userData.tipoUsuario === 'cliente' && styles.cardSelected]}
                                onPress={() => setUserData({ ...userData, tipoUsuario: 'cliente' })}
                            >
                                <MaterialIcons name="person" size={40} color="#007AFF" />
                                <Text style={styles.cardTitle}>Cliente</Text>
                                <Text style={styles.cardDescription}>Realize pedidos e receba os produtos em casa.</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.card, userData.tipoUsuario === 'distribuidora' && styles.cardSelected]}
                                onPress={() => setUserData({ ...userData, tipoUsuario: 'distribuidora' })}
                            >
                                <MaterialIcons name="store" size={40} color="#007AFF" />
                                <Text style={styles.cardTitle}>Distribuidora</Text>
                                <Text style={styles.cardDescription}>Cadastre seus produtos e receba pedidos.</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <>
                        <View style={styles.upperContainer}>
                            <View style={styles.imagePickerContainer}>
                                <TouchableOpacity onPress={pickImage}>
                                    <Image source={selectedImage ? { uri: selectedImage } : require('../assets/foto.png')} style={styles.image} />
                                </TouchableOpacity>
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
                                content='CPF/CNPJ'
                                appearance={styles.styleInput}
                                keyboardType='numeric'
                                onChangeText={(text) => setUserData({ ...userData, cnpj_cpf: text })}
                            />
                            <InputStyle
                                content='Telefone'
                                appearance={styles.styleInput}
                                keyboardType='phone-pad'
                                onChangeText={(text) => setUserData({ ...userData, telefoneCelular: text })}
                            />
                            <InputStyle
                                content='CEP'
                                appearance={styles.styleInput}
                                keyboardType='numeric'
                                onChangeText={(text) => setUserData({ ...userData, cep: text })}
                            />
                            <InputStyle
                                content='Estado' // Novo campo
                                appearance={styles.styleInput}
                                onChangeText={(text) => setUserData({ ...userData, estado: text })}
                            />
                            <InputStyle
                                content='Cidade'
                                appearance={styles.styleInput}
                                onChangeText={(text) => setUserData({ ...userData, cidade: text })}
                            />
                            <InputStyle
                                content='Bairro'
                                appearance={styles.styleInput}
                                onChangeText={(text) => setUserData({ ...userData, bairro: text })}
                            />
                            <InputStyle
                                content='Rua'
                                appearance={styles.styleInput}
                                onChangeText={(text) => setUserData({ ...userData, rua: text })}
                            />
                            <InputStyle
                                content='Número'
                                appearance={styles.styleInput}
                                keyboardType='numeric'
                                onChangeText={(text) => setUserData({ ...userData, numero: text })}
                            />
                            <InputStyle
                                content='Descrição'
                                appearance={styles.styleInput}
                                onChangeText={(text) => setUserData({ ...userData, descricao: text })}
                            />
                        </View>
                    </>
                )}
                <View style={styles.buttonContainer}>
                    {isLoading ? (
                        <ActivityIndicator size="large" color="#007AFF" />
                    ) : (
                        <>
                            <ButtonStyle action={handleNextStep} content={step === 1 ? 'Próximo' : 'Cadastrar'} />
                            {step === 2 && (
                                <ButtonStyle action={() => setStep(1)} content='Voltar' />
                            )}
                        </>
                    )}
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
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    background: {
        flex: 1,
        resizeMode: "cover",
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    cardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    card: {
        width: '45%',
        padding: 30,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardSelected: {
        borderColor: '#007AFF',
        borderWidth: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardDescription: {
        fontSize: 14,
        textAlign: 'center',
    },
    upperContainer: {
        width: '100%',
        //backgroundColor: '#018ABE',
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
    },
    imagePickerContainer: {
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    inputsContainer: {
        width: '80%',
        marginBottom: 20,
    },
    styleInput: {
        width: '100%',
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        color: 'black',
    },
    buttonContainer: {
        width: '50%',
        alignItems: 'center',
        marginTop: 20,
    },
    createAccountContainer: {
        marginTop: 20,
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
    passwordHint: {
        color: 'black',
        marginBottom: 10,
    },
});

export default Cadastro;
