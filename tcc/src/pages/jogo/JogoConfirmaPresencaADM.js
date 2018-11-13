import React from "react";
import { StyleSheet, View, Text } from "react-native";

class JogoConfirmaPresencaADM extends React.Component {
    render() {

        return (
            <View style={styles.container}>
                <Text>JogoConfirmaPresencaADM</Text>
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

export default JogoConfirmaPresencaADM;