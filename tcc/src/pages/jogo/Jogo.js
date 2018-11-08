import React from "react";
import { StyleSheet, View, Image, Button, Text } from "react-native";

import { connect } from "react-redux";

class Jogo extends React.Component {
    renderButton() {
        const { grupoSelected, jogador, navigation } = this.props;
        if (grupoSelected.idLider === jogador.id) {
            return (
                <View style={{paddingTop: 20}}>
                    <Button
                        title='Criar partida' 
                        onPress={() => navigation.navigate('JogoNovaPartida')} />
                </View>
            );
        } else {
            return (
                <View style={{paddingTop: 20}}>
                    <Text>Nenhuma partida em andamento!</Text>
                </View>
            )
        }
    }

    render() {
        const { grupoSelected } = this.props;
        console.log(grupoSelected);
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