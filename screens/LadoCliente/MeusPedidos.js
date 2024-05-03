import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import PedidoCard from '../../components/Cliente/PedidoCard';
import CategoriaSelector from '../../components/Cliente/SeletorCategoria';

function MeusPedidos() {
    const [selectedCategory, setSelectedCategory] = useState('Em Andamento');

    const pedidos = [
        {
            nomeEmpresa: 'Empresa A',
            idPedido: '123456',
            dataHoraEntrega: '18/04/2024 10:00',
            status: 'Em Andamento',
            endereco: 'Rua A, 123',
            nomeProduto: 'Produto X',
            quantidadeProduto: 2,
        },
        {
            nomeEmpresa: 'Empresa A',
            idPedido: '123456',
            dataHoraEntrega: '18/04/2024 10:00',
            status: 'Em Andamento',
            endereco: 'Rua B, 456',
            nomeProduto: 'Produto Y',
            quantidadeProduto: 1,
        },
        {
            nomeEmpresa: 'Empresa B',
            idPedido: '789012',
            dataHoraEntrega: '19/04/2024 15:30',
            status: 'Completo',
            endereco: 'Rua C, 789',
            nomeProduto: 'Produto Z',
            quantidadeProduto: 3,
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
                        statusPedido={pedido.status}
                        endereco={pedido.endereco}
                        nomeProduto={pedido.nomeProduto}
                        quantidadeProduto={pedido.quantidadeProduto}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

export default MeusPedidos;
