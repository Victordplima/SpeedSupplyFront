import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';

function ButtonStyle(props) {
    return (
        <View style={props.container != null ? props.container : styles.container}>
            <Pressable
                onPress={props.action}
                style={props.appearance != null ? props.appearance : styles.button}
            >
                <Text style={props.styleContent != null ? props.styleContent : styles.text}>
                    {props.content}
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
    },
    button: {
        backgroundColor: '#018ABE',
        alignItems: 'center',
        padding: '3%',
        borderRadius: 5,
    },
    text: {
        fontSize: 16,
    }
});

export default ButtonStyle;