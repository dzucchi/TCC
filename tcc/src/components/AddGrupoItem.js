import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AddGrupoItem = ({ onPress }) => (
    <TouchableOpacity 
        onPress={onPress}>
        <View style={styles.container}>
            <Icon name='plus' size={23} style={styles.icon}/>
            <Text style={styles.texto}>NOVO GRUPO</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'white',
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
    }
});

export default AddGrupoItem;