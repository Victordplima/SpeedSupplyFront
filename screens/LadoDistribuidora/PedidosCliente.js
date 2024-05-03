import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import PedidoCardDistribuidora from '../../components/Distribuidora/PedidoCardDistribuidora';
import CategoriaSelectorDistribuidora from '../../components/Distribuidora/SeletorCategoria';

function PedidosCliente() {
    const [selectedCategory, setSelectedCategory] = useState('Em Andamento');

    const pedidos = [
        {
            nomeCliente: 'Anita Massagem',
            idPedido: '123456',
            rua: 'Rua do Prazer',
            bairro: 'Vila Sensual',
            numero: '123',
            status: 'Em Andamento',
        },
        {
            nomeCliente: 'Jack Longo',
            idPedido: '123451',
            rua: 'Avenida dos Prazeres',
            bairro: 'Bairro do Desejo',
            numero: '456',
            status: 'Em Andamento',
        },
        {
            nomeCliente: 'Bella Delícia',
            idPedido: '789012',
            rua: 'Alameda dos Encantos',
            bairro: 'Vila do Prazer',
            numero: '789',
            status: 'Completo',
        },
    ];
    
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const filteredPedidos = pedidos.filter((pedido) => pedido.status === selectedCategory);

    return (
        <View style={{ flex: 1 }}>
            <CategoriaSelectorDistribuidora
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategorySelect}
            />
            <ScrollView>
                {filteredPedidos.map((pedido, index) => (
                    <PedidoCardDistribuidora
                        key={index}
                        nomeCliente={pedido.nomeCliente}
                        idPedido={pedido.idPedido}
                        rua={pedido.rua}
                        bairro={pedido.bairro}
                        numero={pedido.numero}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

export default PedidosCliente;
