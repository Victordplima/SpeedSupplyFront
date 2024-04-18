import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import InputStyle from '../components/InputStyle';
import ButtonStyle from '../components/ButtonStyle';

function Cadastro({navigation}) {
    return (
        <View style={styles.container}>
            <InputStyle content='Nome de Usuário' appearance={styles.styleInput} />
            <InputStyle content='Email' appearance={styles.styleInput} />
            <InputStyle content='Confirmar Email' appearance={styles.styleInput} />
            <InputStyle content='Senha' appearance={styles.styleInput} />
            <InputStyle content='Confirmar Senha' appearance={styles.styleInput} />
            <InputStyle content='CPF/CNPJ' appearance={styles.styleInput} />
            <InputStyle content='Tipo de Usuário' appearance={styles.styleInput} />

            <ButtonStyle action={() => navigation.navigate('Login')} content='Cadastrar'/>
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
});

export default Cadastro;