import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const GrupoItem = ({ grupo, isFirstColumn, onPress }) => (
    <TouchableOpacity
        onPress={onPress} >
        <View>
                <Text>
                    DIOGOGOGOG
                </Text>
            
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
    card: {
        flex: 1,
        borderWidth: 1,
        // Solução 2
        // margin: 10,
    },
    cardTitleWrapper: {
        backgroundColor: 'black',
        height: 50,

        position: 'absolute',
        bottom: 0,
        opacity: .8,

        width: '100%',

        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 3,
        paddingRight: 3,

        alignItems: 'center',
    },
    cardTitle: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    firstColumn: {
        paddingLeft: 10,
    },
    lastColumn: {
        paddingRight: 10,
    }
});

export default GrupoItem;