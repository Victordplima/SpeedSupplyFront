import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ButtonStyle from '../components/ButtonStyle';

function Notificacoes({ navigation }) {
    const notifications = [
        { id: 1, message: 'Pedido aprovado #1231231', icon: 'cart-outline', date: new Date() },
        { id: 2, message: 'Novo pedido recebido #12312123', icon: 'cart-outline', date: new Date('2024-04-22T12:00:00') },
        { id: 3, message: 'Alteração do preço da maçã de R$20,99 para R$1,50', icon: 'megaphone-outline', date: new Date('2024-04-21T10:30:00') }
    ];

    const formatDate = (date) => {
        const now = new Date();
        const diff = now - date;

        const oneDay = 24 * 60 * 60 * 1000;
        const oneHour = 60 * 60 * 1000;

        if (diff < oneDay) {
            // Format time if it's less than a day
            const hours = date.getHours();
            const minutes = date.getMinutes();
            return `Hoje às ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
        } else if (diff < 2 * oneDay) {
            // Format time if it's yesterday
            const hours = date.getHours();
            const minutes = date.getMinutes();
            return `Ontem às ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
        } else {
            // Format time for older dates
            const daysAgo = Math.floor(diff / oneDay);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            return `${daysAgo} dias atrás às ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                {notifications.map(notification => (
                    <View key={notification.id} style={styles.notification}>
                        <View style={styles.notificationContent}>
                            <Ionicons name={notification.icon} size={24} color="#007AFF" style={styles.icon} />
                            <Text style={styles.notificationText}>{notification.message}</Text>
                        </View>
                        <View style={styles.notificationDate}>
                            <Text style={styles.dateText}>{formatDate(notification.date)}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Align items at the top
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    notification: {
        flexDirection: 'column',
        backgroundColor: '#F0F0F0',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%', // Set width to 100%
    },
    notificationContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
    notificationText: {
        fontSize: 16,
    },
    notificationDate: {
        marginTop: 5, // Add margin between message and date
    },
    dateText: {
        fontSize: 12,
        color: 'gray',
    },
    buttonContainer: {
        marginTop: 20,
    },
});

export default Notificacoes;
