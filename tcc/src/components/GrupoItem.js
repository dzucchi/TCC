import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const GrupoItem = ({ grupo, onPress }) => (
    <TouchableOpacity
        onPress={onPress} 
    >
        <View style={styles.container}>
            <Text style={styles.texto}>
                { grupo.nome }
            </Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 5,
        elevation: 1,

        flexDirection: 'row',
        paddingTop: 3,
        paddingBottom: 3,
    },
   texto: {
        fontSize: 18,
        paddingLeft: 5,
    },
});

export default GrupoItem;