import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Pressable, RefreshControl } from 'react-native';
import { searchDistribuidoras } from '../../utils/http';
import { AuthContext } from '../../context/authContext';

const FeedDistribuidora = ({ navigation }) => {
    const [expandedCard, setExpandedCard] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [distribuidoras, setDistribuidoras] = useState([]);
    const [refreshing, setRefreshing] = useState(false); // Estado para controlar o refresh
    const { userToken } = useContext(AuthContext);

    const loadDistribuidoras = async () => {
        try {
            const data = await searchDistribuidoras(1, userToken);
            setDistribuidoras(data);
        } catch (error) {
            console.error('Erro ao carregar distribuidoras:', error.message);
        }
    };

    useEffect(() => {
        loadDistribuidoras();
    }, [userToken]);

    const handleCardExpansion = (index) => {
        if (expandedCard === index) {
            setExpandedCard(null);
        } else {
            setExpandedCard(index);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true); // Ativa o indicador de refresh
        await loadDistribuidoras(); // Carrega os dados novamente
        setRefreshing(false); // Desativa o indicador de refresh
    };

    return (
        <View style={styles.container}>
            {/* Campo de pesquisa */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar distribuidoras..."
                    onChangeText={(text) => setSearchQuery(text)}
                    value={searchQuery}
                />
            </View>

            <ScrollView
                style={styles.scrollView}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} // Componente RefreshControl
            >
                {distribuidoras.map((distribuidora, index) => (
                    <TouchableOpacity key={distribuidora.id} onPress={() => handleCardExpansion(index)}>
                        <View style={[styles.card, expandedCard === index && styles.expandedCard]}>
                            <Text style={styles.nome}>{distribuidora.nome}</Text>
                            {expandedCard === index && (
                                <View key={`expanded_${distribuidora.id}`}>
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        flex: 1,
    },
    reloadButton: {
        backgroundColor: '#018ABE',
        borderRadius: 5,
        padding: 10,
        marginLeft: 10,
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
