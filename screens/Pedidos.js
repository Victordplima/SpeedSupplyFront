import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import PedidoCard from '../components/PedidoCard';
import CategoriaSelector from '../components/SeletorCategoria';

function Pedidos() {
    const [selectedCategory, setSelectedCategory] = useState('Em Andamento');

    const pedidos = [
        {
            nomeEmpresa: 'Empresa A',
            idPedido: '123456',
            dataHoraEntrega: '18/04/2024 10:00',
            status: 'Em Andamento',
        },
        {
            nomeEmpresa: 'Empresa B',
            idPedido: '789012',
            dataHoraEntrega: '19/04/2024 15:30',
            status: 'Completo',
        },
    ];

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const filteredPedidos = pedidos.filter((pedido) => pedido.status === selectedCategory);

    return (
        <View style={{ flex: 1 }}>
            <CategoriaSelector
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategorySelect}
            />
            <ScrollView>
                {filteredPedidos.map((pedido, index) => (
                    <PedidoCard
                        key={index}
                        nomeEmpresa={pedido.nomeEmpresa}
                        idPedido={pedido.idPedido}
                        dataHoraEntrega={pedido.dataHoraEntrega}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

export default Pedidos;