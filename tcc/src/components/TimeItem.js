import React from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class PlayerBeingItem extends React.Component {
    getQtdJogadores(time) {
        if (time) {
            if (time.jogadores) {
                return Object.keys(time.jogadores).length;
            }
        }
    }

    render() {
        const { time, onPress } = this.props;

        return (
            <TouchableOpacity
                onPress={onPress} 
            >
                <View style={styles.line}>
                    <View>
                        <Text style={styles.nome}>
                            { time.nome }
                        </Text>
                        <Text>
                            { `${this.getQtdJogadores(time)} jogadores` }
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    nome: {
        fontSize: 30,
    },
});

export default PlayerBeingItem;