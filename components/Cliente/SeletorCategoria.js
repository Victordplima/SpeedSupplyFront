import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CategoriaSelector = ({ selectedCategory, onSelectCategory }) => {
    const [showScrollLeftIndicator, setShowScrollLeftIndicator] = useState(false);
    const [showScrollRightIndicator, setShowScrollRightIndicator] = useState(false);

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isScrollableLeft = contentOffset.x > 0;
        const isScrollableRight = contentSize.width > layoutMeasurement.width + contentOffset.x;
        setShowScrollLeftIndicator(isScrollableLeft);
        setShowScrollRightIndicator(isScrollableRight && !isScrollableLeft);
    };

    useEffect(() => {
        onSelectCategory('Em análise');
        setShowScrollRightIndicator(true);
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
                        onPress={() => onSelectCategory('Em análise')}
                        android_ripple={{ color: "#86B6CF", borderless: false }}
                        style={[styles.category, selectedCategory === 'Em análise' && styles.selectedCategory]}
                    >
                        <Text style={[styles.categoryText, selectedCategory === 'Em análise' && styles.selectedCategoryText]}>Em análise</Text>
                    </Pressable>
                </View>
                <View style={styles.categoryWrapper}>
                    <Pressable
                        onPress={() => onSelectCategory('Aceito')}
                        android_ripple={{ color: "#86B6CF", borderless: false }}
                        style={[styles.category, selectedCategory === 'Aceito' && styles.selectedCategory]}
                    >
                        <Text style={[styles.categoryText, selectedCategory === 'Aceito' && styles.selectedCategoryText]}>Aceito</Text>
                    </Pressable>
                </View>
                <View style={styles.categoryWrapper}>
                    <Pressable
                        onPress={() => onSelectCategory('Rejeitado')}
                        android_ripple={{ color: "#86B6CF", borderless: false }}
                        style={[styles.category, selectedCategory === 'Rejeitado' && styles.selectedCategory]}
                    >
                        <Text style={[styles.categoryText, selectedCategory === 'Rejeitado' && styles.selectedCategoryText]}>Rejeitado</Text>
                    </Pressable>
                </View>
                <View style={styles.categoryWrapper}>
                    <Pressable
                        onPress={() => onSelectCategory('Entregue')}
                        android_ripple={{ color: "#86B6CF", borderless: false }}
                        style={[styles.category, selectedCategory === 'Entregue' && styles.selectedCategory]}
                    >
                        <Text style={[styles.categoryText, selectedCategory === 'Entregue' && styles.selectedCategoryText]}>Entregue</Text>
                    </Pressable>
                </View>
                <View style={styles.categoryWrapper}>
                    <Pressable
                        onPress={() => onSelectCategory('Cancelado')}
                        android_ripple={{ color: "#86B6CF", borderless: false }}
                        style={[styles.category, selectedCategory === 'Cancelado' && styles.selectedCategory]}
                    >
                        <Text style={[styles.categoryText, selectedCategory === 'Cancelado' && styles.selectedCategoryText]}>Cancelado</Text>
                    </Pressable>
                </View>
            </ScrollView>
            {showScrollLeftIndicator && (
                <View style={[styles.scrollIndicator, styles.scrollIndicatorLeft]}>
                    <Ionicons name="chevron-back-outline" size={24} color={'black'} />
                </View>
            )}
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
        position: 'relative',
    },
    scrollContainer: {
        alignItems: 'center',
    },
    categoryWrapper: {
        overflow: 'hidden',
        height: '100%',
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
    selectedCategoryText: {
        color: 'white',
    },
    categoryText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    scrollIndicator: {
        position: 'absolute',
        bottom: 0,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    scrollIndicatorLeft: {
        left: 5,
    },
    scrollIndicatorRight: {
        right: 5,
    },
});

export default CategoriaSelector;
