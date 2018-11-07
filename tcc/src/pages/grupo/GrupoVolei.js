import React from "react";
import { StyleSheet, View, Text } from "react-native";

class GrupoVolei extends React.Component {
    render() {

        return (
            <View style={styles.container}>
                <Text>Grupo Vôlei</Text>
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

export default GrupoVolei;