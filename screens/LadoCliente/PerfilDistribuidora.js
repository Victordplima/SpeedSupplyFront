import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PerfilDistribuidora = () => {
  const produtos = [
    { id: 1, nome: 'Produto 1', preco: 'R$ 10.00', quantidade: 0 },
    { id: 2, nome: 'Produto 2', preco: 'R$ 15.00', quantidade: 0 },
    { id: 3, nome: 'Produto 3', preco: 'R$ 20.00', quantidade: 0 },
    { id: 4, nome: 'Produto 4', preco: 'R$ 10.00', quantidade: 0 },
    { id: 5, nome: 'Produto 5', preco: 'R$ 15.00', quantidade: 0 },
    { id: 6, nome: 'Produto 6', preco: 'R$ 20.00', quantidade: 0 },
    { id: 7, nome: 'Produto 7', preco: 'R$ 10.00', quantidade: 0 },
    { id: 8, nome: 'Produto 8', preco: 'R$ 15.00', quantidade: 0 },
    { id: 9, nome: 'Produto 9', preco: 'R$ 20.00', quantidade: 0 },
    { id: 10, nome: 'Produto 10', preco: 'R$ 10.00', quantidade: 0 },
    { id: 11, nome: 'Produto 11', preco: 'R$ 15.00', quantidade: 0 },
    { id: 12, nome: 'Produto 12', preco: 'R$ 20.00', quantidade: 0 },
    { id: 13, nome: 'Produto 13', preco: 'R$ 10.00', quantidade: 0 },
    { id: 14, nome: 'Produto 14', preco: 'R$ 15.00', quantidade: 0 },
    { id: 15, nome: 'Produto 15', preco: 'R$ 20.00', quantidade: 0 },
    
  ];

  const endereco = 'Rua Exemplo, 1234 - Cidade - Estado';
  const TelefoneDistribuidora = '123456789';

  //armazenar a quantidade de cada produto
  const [quantidades, setQuantidades] = useState({});

  // Função para atualizar a quantidade de um produto
  const atualizarQuantidade = (id, quantidade) => {
    setQuantidades(prevState => ({
      ...prevState,
      [id]: quantidade,
    }));
  };

  // Função para limpar as quantidades
  const limparQuantidades = () => {
    setQuantidades({});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="ellipse-outline" size={50} color="blue" style={styles.logo} />
        <Text style={styles.title}>Nome Distribuidora</Text>
      </View>
      <Text style={styles.TelefoneDist}>Telefone: {TelefoneDistribuidora}</Text>
      <Text style={styles.endereco}>{endereco}</Text>
      <TouchableOpacity style={styles.buttonLimpar} onPress={limparQuantidades}>
        <Text style={styles.carrinhoButtonText}>Limpar</Text>
      </TouchableOpacity>
      <ScrollView style={styles.produtosContainer}>
        {produtos.map(produto => (
          <View key={produto.id} style={styles.produtoItem}>
            <View style={styles.infoProduto}>
              <Text style={styles.produtoNome}>{produto.nome}</Text>
              <Text style={styles.produtoPreco}>{produto.preco}</Text>
            </View>
            <TextInput
              style={styles.inputQuantidade}
              keyboardType="numeric"
              placeholder="Qtd"
              onChangeText={text => atualizarQuantidade(produto.id, text)}
              value={quantidades[produto.id] ? quantidades[produto.id].toString() : ''}
            />
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.carrinhoButton}>
          <Ionicons name="cart-outline" size={24} color="white" />
          <Text style={styles.carrinhoButtonText}>Fazer Pedido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: '10%',
  },
  logo: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  produtosContainer: {
    marginBottom: 20,
    maxHeight: '60%', // Altura máxima da caixa rolável de produtos
  },
  produtoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 10,
  },
  infoProduto: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  produtoNome: {
    fontSize: 16,
    marginRight: 10,
  },
  produtoPreco: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputQuantidade: {
    width: '40%',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  TelefoneDist:{
    fontSize: 16,
    marginBottom: 10,
    paddingHorizontal: '10%',
  },
  endereco: {
    fontSize: 16,
    marginBottom: 10,
    paddingHorizontal: '10%',
  },
  footer: {
    flexDirection: 'row',    
    justifyContent: 'center',
  },
  carrinhoButton: {
    alignItems: 'center',
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  carrinhoButtonText: {
    color: 'white',
    paddingHorizontal:'10%',
  },
  buttonLimpar: {
    alignItems: 'center',
    backgroundColor: 'blue',
    paddingVertical: 10,
    borderRadius: 20,
    width: '47%',
    alignSelf: 'flex-end', // Para posicionar à direita
    justifyContent: 'center', // Para centralizar verticalmente
  },
});

export default PerfilDistribuidora;
