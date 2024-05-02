// Tela CadastroEtapa2.js

import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import InputStyle from '../components/InputStyle';
import ButtonStyle from '../components/ButtonStyle';

function CadastroEtapa2({ navigation }) {
    return (
        <View style={styles.container}>
            <InputStyle content='CEP' appearance={styles.styleInput} />
            <InputStyle content='CPF/CNPJ' appearance={styles.styleInput} />
            <InputStyle content='Tipo de Usuário' appearance={styles.styleInput} />

            <View style={styles.buttonContainer}>
                <ButtonStyle action={() => navigation.navigate('Login')} content='Cadastrar' />
                <View style={{ marginTop: 10 }} />
                <ButtonStyle action={() => navigation.navigate('Cadastro')} content='Voltar' />
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

export default CadastroEtapa2;
