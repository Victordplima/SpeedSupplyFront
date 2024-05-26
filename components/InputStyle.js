import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

function InputStyle(props) {
    return (
        <TextInput
            style={[styles.styleInput, props.appearance]}
            placeholder={props.content}
            onChangeText={props.onChangeText} // Passe onChangeText para o TextInput
            secureTextEntry={props.secureTextEntry} // Adicione secureTextEntry
        />
    );
}

const styles = StyleSheet.create({
    styleInput: {
        borderColor: '#000000',
        borderBottomWidth: 2,
        height: 40,
    },
});

export default InputStyle;
