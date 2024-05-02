// Tela CadastroEtapa1.js

import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import InputStyle from '../components/InputStyle';
import ButtonStyle from '../components/ButtonStyle';

function CadastroEtapa1({ navigation }) {
    return (
        <View style={styles.container}>
            <InputStyle content='Nome de Usuário' appearance={styles.styleInput} />
            <InputStyle content='Email' appearance={styles.styleInput} />
            <InputStyle content='Confirmar Email' appearance={styles.styleInput} />
            <InputStyle content='Senha' appearance={styles.styleInput} />
            <InputStyle content='Confirmar Senha' appearance={styles.styleInput} />
            <View style={styles.buttonContainer}>
            <ButtonStyle action={() => navigation.navigate('Cadastro Etapa 2')} content='Proximo' />
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: '10%'
    },
    styleInput: {
        marginBottom: '7%',
        width: '80%',
    },
    buttonContainer: {
        width: '50%' ,
        marginTop: 20,
        alignItems: 'center',
    },
});

export default CadastroEtapa1;

