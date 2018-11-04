import React from "react";
import { StyleSheet, View, Text } from "react-native";

class Jogo extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <View>
                <Text>{ navigation.state.params.grupo.nome }</Text>
            </View>
        );
    }
}

export default Jogo;