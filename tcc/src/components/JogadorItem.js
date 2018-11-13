import React from "react";

import { View, Text, StyleSheet, Image } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const JogadorItem = ({ jogador }) => (
    <View style={[styles.line, styles.container]}>
        <View>
            <Text style={styles.nome}>
                { jogador.nome }
            </Text>
            <Text style={styles.posicao}>
                { jogador.futebol.posicao }
            </Text>
        </View>
        <View style={{paddingTop: 10}}>
            { jogador.presenca_confirmada 
                ? <Image
                    source={require('../../resources/checked.png')}
                    aspectRatio={1}
                    resizeMode="cover"/>
                : <Image
                    source={require('../../resources/multiply.png')}
                    aspectRatio={1}
                    resizeMode="cover"/>
            }
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 5,
        elevation: 1,

        paddingTop: 3,
        paddingBottom: 3,
        
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nome: {
        fontSize: 30,
        paddingLeft: 5,
    },
    posicao: {
        paddingLeft: 5,
    },
});

export default JogadorItem;