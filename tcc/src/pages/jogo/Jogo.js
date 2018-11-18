import React from "react";

import { StyleSheet, View, Image, Button, Text } from "react-native";

import { connect } from "react-redux";

import JogoNovaPartida from "./JogoNovaPartida";

import JogoConfirmaPresenca from "./JogoConfirmaPresenca";

import MarcarJogadoresPresentesADM from "./MarcarJogadoresPresentesADM";

import TimeLista from "./TimeLista";

import { setEstagio } from "../../actions";

class Jogo extends React.Component {
    renderAgendarJogoButton() {
        const { grupoSelected, jogador } = this.props;

        if (grupoSelected.id_lider === jogador.id_user) {
            return (
                <View style={{paddingTop: 20}}>
                    <Button
                        title='Agendar jogo' 
                        onPress={() => {
                            grupoSelected.estagio = 1;             
                            this.forceUpdate();
                        }} />
                </View>
            );
        } else {
            return (
                <View style={styles.card}>
                    <Text style={{fontSize: 25}}>Nenhum jogo marcado</Text>
                </View>
            )
        }
    }

    renderConfigButton() {
        const { navigation } = this.props;
        return (
            <View style={{paddingTop: 10}}>
                <Button
                    title='Configurações'
                    onPress={() => navigation.navigate('GrupoFutebolDetail')} />
            </View>
        );
    }

    render() {
        const { grupoSelected, setEstagio, navigation } = this.props;

        if (grupoSelected.estagio === 1) {
            return (
                <JogoNovaPartida 
                    onPress={() => {
                        grupoSelected.estagio = 2;
                        this.forceUpdate();
                    }} />
            );
        }

        if (grupoSelected.estagio === 2) {
            return (
                <JogoConfirmaPresenca
                    onPress={ async () => {
                        await setEstagio(3);
                        grupoSelected.estagio = 3;
                        this.forceUpdate();
                    }} />
            )
        }

        if (grupoSelected.estagio === 3) {
            return (
                <MarcarJogadoresPresentesADM
                    onPress={ async () => {
                        await setEstagio(4);
                        grupoSelected.estagio = 4;
                        this.forceUpdate();
                    }} />
            )
        }

        if (grupoSelected.estagio === 4) {
            return (
                <TimeLista
                    navigation={navigation}
                    onPress={ async () => {
                        await setEstagio(0);
                        grupoSelected.estagio = 0;
                        this.forceUpdate();
                    }} />
            )
        }

        return (   
            <View>
                <View style={styles.card}>
                    <Image
                        source={require('../../../resources/soccer-ball-variant.png')}
                        aspectRatio={1}
                        resizeMode="cover"
                    />
                </View>
                <View style={{padding: 10}}>
                    { this.renderAgendarJogoButton() }
                    { this.renderConfigButton() }
                </View>
            </View>
            
        );
    }
    
}

const styles = StyleSheet.create({
    card: {
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

function mapStateToProps(state) {
    return {
        grupoSelected: state.grupoSelected,
        jogador: state.jogador,
    }
}

const mapDispatchToProps = {
    setEstagio,
}

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);