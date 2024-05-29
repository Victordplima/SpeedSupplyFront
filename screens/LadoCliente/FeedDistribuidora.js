import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Pressable, RefreshControl, ActivityIndicator } from 'react-native';
import { searchDistribuidoras } from '../../utils/http';
import { AuthContext } from '../../context/authContext';

const FeedDistribuidora = ({ navigation }) => {
    const [expandedCard, setExpandedCard] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [distribuidoras, setDistribuidoras] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const { userToken } = useContext(AuthContext);

    const loadDistribuidoras = async () => {
        try {
            setLoading(true);
            const data = await searchDistribuidoras(1, userToken);
            setDistribuidoras(data);
        } catch (error) {
            console.error('Erro ao carregar distribuidoras:', error.message);
        } finally {
            setLoading(false);
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
        setRefreshing(true);
        await loadDistribuidoras();
        setRefreshing(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar distribuidoras..."
                    onChangeText={(text) => setSearchQuery(text)}
                    value={searchQuery}
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#018ABE" />
            ) : (
                <ScrollView
                    style={styles.scrollView}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    {distribuidoras.map((distribuidora, index) => (
                        <TouchableOpacity key={`${distribuidora.id}-${index}`} onPress={() => handleCardExpansion(index)}>
                            <View style={[styles.card, expandedCard === index && styles.expandedCard]}>
                                <Text style={styles.nome}>{distribuidora.nome}</Text>
                                {expandedCard === index && (
                                    <View>
                                        <Text style={styles.descricao}>{distribuidora.descricao}</Text>
                                        <Text style={styles.endereco}>{distribuidora.endereco}</Text>
                                        <Pressable
                                            style={styles.button}
                                            onPress={() => {
                                                console.log('Navigating to PerfilDistribuidora with idProfile:', distribuidora.idUsuario);
                                                navigation.navigate('PerfilDistribuidora', { idProfile: distribuidora.idUsuario });
                                            }}                                            
                                        >
                                            <Text style={styles.buttonText}>Ver Perfil</Text>
                                        </Pressable>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
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
