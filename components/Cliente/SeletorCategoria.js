import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CategoriaSelector = ({ selectedCategory, onSelectCategory }) => {
    const [showScrollLeftIndicator, setShowScrollLeftIndicator] = useState(false);
    const [showScrollRightIndicator, setShowScrollRightIndicator] = useState(false);

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

        // Verifica se o conteúdo é rolável para a esquerda
        const isScrollableLeft = contentOffset.x > 0;

        // Verifica se o conteúdo é rolável para a direita
        const isScrollableRight = contentSize.width > layoutMeasurement.width + contentOffset.x;

        // Mostra a seta indicadora para a esquerda apenas se o conteúdo for rolável
        setShowScrollLeftIndicator(isScrollableLeft);

        // Mostra a seta indicadora para a direita apenas se o conteúdo for rolável
        setShowScrollRightIndicator(isScrollableRight && !isScrollableLeft); // Oculta a seta para a direita quando chegar no final
    };

    useEffect(() => {
        onSelectCategory('Em Análise');
        setShowScrollRightIndicator(true); // Inicialmente, apenas a seta para a direita é mostrada
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <View style={styles.categoryWrapper}>
                    <Pressable
                        onPress={() => onSelectCategory('Em Análise')}
                        android_ripple={{ color: "#86B6CF", borderless: false }} // Aplicando ripple diretamente ao Pressable
                        style={[
                            styles.category,
                            selectedCategory === 'Em Análise' && styles.selectedCategory,
                        ]}
                    >
                        <Text style={styles.categoryText}>Em Análise</Text>
                    </Pressable>
                </View>
                <View style={styles.categoryWrapper}>
                    <Pressable
                        onPress={() => onSelectCategory('Aceito')}
                        android_ripple={{ color: "#86B6CF", borderless: false }} // Aplicando ripple diretamente ao Pressable
                        style={[
                            styles.category,
                            selectedCategory === 'Aceito' && styles.selectedCategory,
                        ]}
                    >
                        <Text style={styles.categoryText}>Aceito</Text>
                    </Pressable>
                </View>
                <View style={styles.categoryWrapper}>
                    <Pressable
                        onPress={() => onSelectCategory('Rejeitado')}
                        android_ripple={{ color: "#86B6CF", borderless: false }} // Aplicando ripple diretamente ao Pressable
                        style={[
                            styles.category,
                            selectedCategory === 'Rejeitado' && styles.selectedCategory,
                        ]}
                    >
                        <Text style={styles.categoryText}>Rejeitado</Text>
                    </Pressable>
                </View>
                <View style={styles.categoryWrapper}>
                    <Pressable
                        onPress={() => onSelectCategory('Entregue')}
                        android_ripple={{ color: "#86B6CF", borderless: false }} // Aplicando ripple diretamente ao Pressable
                        style={[
                            styles.category,
                            selectedCategory === 'Entregue' && styles.selectedCategory,
                        ]}
                    >
                        <Text style={styles.categoryText}>Entregue</Text>
                    </Pressable>
                </View>
                <View style={styles.categoryWrapper}>
                    <Pressable
                        onPress={() => onSelectCategory('Cancelado')}
                        android_ripple={{ color: "#86B6CF", borderless: false }} // Aplicando ripple diretamente ao Pressable
                        style={[
                            styles.category,
                            selectedCategory === 'Cancelado' && styles.selectedCategory,
                        ]}
                    >
                        <Text style={styles.categoryText}>Cancelado</Text>
                    </Pressable>
                </View>
            </ScrollView>
            {/* Renderiza a seta indicadora para a esquerda quando necessário */}
            {showScrollLeftIndicator && (
                <View style={[styles.scrollIndicator, styles.scrollIndicatorLeft]}>
                    <Ionicons name="chevron-back-outline" size={24} color={'black'} />
                </View>
            )}
            {/* Renderiza a seta indicadora para a direita quando necessário */}
            {showScrollRightIndicator && (
                <View style={[styles.scrollIndicator, styles.scrollIndicatorRight]}>
                    <Ionicons name="chevron-forward-outline" size={24} color={'black'} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        backgroundColor: '#F0F0F0',
        position: 'relative', // Necessário para posicionar as setas absolutamente
    },
    scrollContainer: {
        alignItems: 'center',
    },
    categoryWrapper: {
        overflow: 'hidden', // Para evitar que o efeito ripple afete a altura do componente
        height: '100%', // Para garantir que o Pressable ocupe toda a altura
    },
    category: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    selectedCategory: {
        backgroundColor: '#018ABE',
    },
    categoryText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    scrollIndicator: {
        position: 'absolute',
        bottom: 0,
        height: '100%', // Para cobrir toda a altura do ScrollView
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    scrollIndicatorLeft: {
        left: 5, // Posiciona a seta indicadora para a esquerda
    },
    scrollIndicatorRight: {
        right: 5, // Posiciona a seta indicadora para a direita
    },
});

export default CategoriaSelector;
