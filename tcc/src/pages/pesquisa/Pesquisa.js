import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

class Pesquisa extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <View>
                <Text>BuscarPesquisa</Text>
                <Button
                    onPress={() => navigation.navigate('SettingsTab')}
                    title="Go to settings tab"
                />
            </View>
        );
    }
}

export default Pesquisa;