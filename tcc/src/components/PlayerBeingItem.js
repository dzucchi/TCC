import React from "react";

import { View, Text, StyleSheet, CheckBox, TouchableOpacity } from "react-native";

class PlayerBeingItem extends React.Component {
    render() {
        const { jogador, onPress, jogador_escalado } = this.props;

        return (
            <TouchableOpacity
                onPress={onPress} 
            >
                <View style={styles.line}>
                    <View>
                        <Text style={styles.nome}>
                            { jogador.nome }
                        </Text>
                        <Text style={styles.posicao}>
                            { jogador.futebol.posicao }
                        </Text>
                    </View>

                    <View style={styles.checkbox}>
                        <CheckBox
                            value={jogador_escalado ? jogador.jogador_escalado : jogador.jogador_presente}
                            disabled={true}
                        />
                        <Text style={{marginTop: 5}}></Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

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
        fontSize: 25,
        paddingLeft: 5,
    },
    posicao: {
        paddingLeft: 5,
    },
    checkbox: {
        padding: 10
    }
});

export default PlayerBeingItem;