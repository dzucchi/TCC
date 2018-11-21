import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";

const NotificacaoIcon = ({ onPress, qtdNotificacoes }) => (
    <TouchableOpacity 
        onPress={onPress}>
        <View style={styles.container}>
            <Icon name='notifications-active' size={30} style={styles.icon}/>
            <Text style={styles.texto}>{qtdNotificacoes}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 5,
        marginBottom: 5,
        elevation: 1,

        flexDirection: 'row',
        paddingTop: 3,
        paddingBottom: 3,
    },
    icon: {
        marginLeft: 5,
    },
    texto: {
        fontSize: 18,
        color: 'red'
    }
});

export default NotificacaoIcon;