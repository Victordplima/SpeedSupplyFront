import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, Text, StyleSheet, RefreshControl } from 'react-native';
import PedidoCard from '../../components/Cliente/PedidoCard';
import CategoriaSelector from '../../components/Cliente/SeletorCategoria';
import { searchRequests } from '../../utils/http';
import { AuthContext } from '../../context/authContext';

function PedidosDistribuidora() {
    const [selectedCategory, setSelectedCategory] = useState('Em Andamento');
    const [pedidos, setPedidos] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const { userToken } = useContext(AuthContext);

    useEffect(() => {
        fetchPedidos();
    }, [userToken]);

    const fetchPedidos = async () => {
        try {
            const response = await searchRequests(userToken);
            const pedidosFormatados = response.map(pedido => ({
                ...pedido,
                dataHora: formatarDataHora(pedido.dataHora)
            }));
            setPedidos(pedidosFormatados);
        } catch (error) {
            console.error('Erro ao buscar pedidos:', error.message);
        } finally {
            setRefreshing(false);
        }
    };

    // Função para formatar a data e hora
    const formatarDataHora = (dataHoraString) => {
        // Divide a string da data/hora pelo caractere "_"
        const partes = dataHoraString.split('_');
        // Retorna a nova string no formato desejado: "dd/mm/yyyy hh/mm"
        return partes[0].replace(/\//g, '-') + ' ' + partes[1].replace(/\//g, ':');
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchPedidos();
    };

    const filteredPedidos = pedidos.filter((pedido) => pedido.statusPedido === selectedCategory);

    return (
        <View style={{ flex: 1 }}>
            <CategoriaSelector
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategorySelect}
            />
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {filteredPedidos.length === 0 ? (
                    <Text style={styles.noPedidosText}>Não há pedidos para exibir</Text>
                ) : (
                    filteredPedidos.map((pedido, index) => (
                        <PedidoCard
                            key={pedido.idPedido}
                            nomeEmpresa={pedido.nome}
                            idPedido={pedido.idPedido}
                            dataHoraPedido={pedido.dataHora}
                            statusPedido={pedido.statusPedido}
                            endereco={`${pedido.rua}, ${pedido.numero} - ${pedido.bairro}, ${pedido.cidade} - ${pedido.estado}, CEP: ${pedido.cep}`}
                            nomeProduto={pedido.nomeComercial}
                            quantidadeProduto={pedido.quantidade}
                            descricao={pedido.descricao}
                            valorUnidade={pedido.valorUnidade}
                            peso={pedido.peso}
                            material={pedido.material}
                            dimensoes={pedido.dimensoes}
                            fabricante={pedido.fabricante}
                        />
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    noPedidosText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default PedidosDistribuidora;
