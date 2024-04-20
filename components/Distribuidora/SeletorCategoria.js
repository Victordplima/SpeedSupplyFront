import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const CategoriaSelectorDistribuidora = ({ selectedCategory, onSelectCategory }) => {
    return (
        <View style={styles.container}>
            <Pressable
                android_ripple={{ color: "#CCC" }}
                style={[
                    styles.category,
                    selectedCategory === 'Em Andamento' && styles.selectedCategory,
                ]}
                onPress={() => onSelectCategory('Em Andamento')}
            >
                <Text style={styles.categoryText}>Em Andamento</Text>
            </Pressable>
            <Pressable
                style={[
                    styles.category,
                    selectedCategory === 'Completo' && styles.selectedCategory,
                ]}
                onPress={() => onSelectCategory('Completo')}
            >
                <Text style={styles.categoryText}>Completo</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        paddingVertical: 20,
    },
    category: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        //backgroundColor: '#D3D3D3',
    },
    selectedCategory: {
        backgroundColor: '#007AFF', // Altere para a cor desejada para a categoria selecionada
    },
    categoryText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default CategoriaSelectorDistribuidora;
