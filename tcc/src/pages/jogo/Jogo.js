import React from "react";
import { StyleSheet, View, Image, Button, Text } from "react-native";

import { connect } from "react-redux";

class Jogo extends React.Component {
    renderButton() {
        const { grupoSelected, jogador, navigation } = this.props;
        if (grupoSelected.id_lider === jogador.id_user) {
            return (
                <View style={{paddingTop: 20}}>
                    <Button
                        title='Agendar jogo' 
                        onPress={() => navigation.navigate('JogoNovaPartida')} />
                </View>
            );
        } else {
            return (
                <View style={{paddingTop: 20}}>
                    <Text>Nenhum jogo marcado</Text>
                </View>
            )
        }
    }

    render() {
        const { grupoSelected } = this.props;
        if (grupoSelected.estagio === 0) {
            return (
                <View style={styles.card}>
                    <Image
                        source={require('../../../resources/soccer-ball-variant.png')}
                        style={styles.image}
                        aspectRatio={1}
                        resizeMode="cover"
                    />
                    { this.renderButton() }
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '70%',
        height: '70%',
    },
})

function mapStateToProps(state) {
    return {
        grupoSelected: state.grupoSelected,
        jogador: state.jogador,
    }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);