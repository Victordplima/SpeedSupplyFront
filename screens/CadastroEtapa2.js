import React from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import InputStyle from '../components/InputStyle';
import ButtonStyle from '../components/ButtonStyle';

function CadastroEtapa2({ navigation }) {
    return (
        <ImageBackground source={require('../assets/backgroundLogin.png')} style={styles.background}>
            <View style={styles.container}>
                {/* Bolinhas indicando as etapas */}
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
                {/* Inputs */}
                <View style={styles.inputsContainer}>
                    <InputStyle content='Rua' appearance={styles.styleInput} />
                    <InputStyle content='Bairro' appearance={styles.styleInput} />
                    <InputStyle content='Cidade' appearance={styles.styleInput} />
                    <InputStyle content='CEP' appearance={styles.styleInput} />
                    <InputStyle content='Número' appearance={styles.styleInput} />
                </View>
                {/* Botão para próxima etapa */}
                <View style={styles.buttonContainer}>
                    <ButtonStyle action={() => navigation.navigate('Login')} content='Cadastrar' />
                    <View style={{ marginTop: 10 }} />
                    <ButtonStyle action={() => navigation.navigate('Cadastro')} content='Voltar' />
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
