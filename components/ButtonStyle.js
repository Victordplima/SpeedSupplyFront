import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';

function ButtonStyle({ action, content, container, appearance, styleContent }) {
    return (
        <View style={container != null ? container : styles.container}>
            <Pressable
                onPress={action}
                style={appearance != null ? appearance : styles.button}
            >
                <Text style={styleContent != null ? styleContent : styles.text}>
                    {content}
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
        color: 'white',
    }
});

export default ButtonStyle;
