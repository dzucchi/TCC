import React from "react";
import { StyleSheet, View, Text } from "react-native";

class JogoNovaPartida extends React.Component {
    render() {

        return (
            <View style={styles.container}>
                <Text>JogoNovaPartida</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default JogoNovaPartida;