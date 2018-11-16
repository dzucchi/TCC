import React from "react";
import { StyleSheet, View, Text } from "react-native";

class ListaDosTimes extends React.Component {
    render() {

        return (
            <View style={styles.container}>
                <Text>ListaDosTimes</Text>
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

export default ListaDosTimes;