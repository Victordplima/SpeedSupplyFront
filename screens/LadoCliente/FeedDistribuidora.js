import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Pressable} from 'react-native';

const FeedDistribuidora = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedCard, setExpandedCard] = useState(null);

    // Função para lidar com a expansão do card
    const handleCardExpansion = (index) => {
        if (expandedCard === index) {
            setExpandedCard(null); // Fechar card se já estiver expandido
        } else {
            setExpandedCard(index); // Expandir card
        }
    };

    // Dados fictícios de distribuidoras e produtos
    const distribuidoras = [
        {
            id: 1,
            nome: 'Distribuidora A',
            descricao: 'Descrição da Distribuidora A',
            endereco: 'Endereço da Distribuidora A',
        },
        {
            id: 2,
            nome: 'Distribuidora B',
            descricao: 'Descrição da Distribuidora B',
            endereco: 'Endereço da Distribuidora B',
        },
    ];

    return (
        <View style={styles.container}>
            {/* Campo de pesquisa */}
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar distribuidoras..."
                onChangeText={(text) => setSearchQuery(text)}
                value={searchQuery}
            />

            <ScrollView style={styles.scrollView}>
                {distribuidoras.map((distribuidora, index) => (
                    <TouchableOpacity key={distribuidora.id} onPress={() => handleCardExpansion(index)}>
                        <View style={styles.card}>
                            <Text style={styles.nome}>{distribuidora.nome}</Text>
                            {expandedCard === index && (
                                <View>
                                    <Text style={styles.descricao}>{distribuidora.descricao}</Text>
                                    <Text style={styles.endereco}>{distribuidora.endereco}</Text>
                                    
                                    <Pressable style={styles.button} onPress={() => navigation.navigate('PerfilDistribuidora')}>
                                        <Text style={styles.buttonText}>Ver Perfil</Text>
                                    
                                    </Pressable>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 20,
    },
    scrollView: {
        flex: 1,
    },
    card: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    descricao: {
        marginBottom: 5,
    },
    endereco: {
        marginBottom: 5,
    },
    produtosTitle: {
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    produto: {
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#018ABE',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default FeedDistribuidora;
