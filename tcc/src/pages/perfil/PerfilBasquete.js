import React from "react";
import { StyleSheet, View, Text } from "react-native";

class PerfilBasquete extends React.Component {
    render() {

        return (
            <View style={styles.container}>
                <Text>Perfil Basquete</Text>
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

export default PerfilBasquete;