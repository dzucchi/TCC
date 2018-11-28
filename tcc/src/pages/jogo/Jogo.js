import React from "react";

import { StyleSheet, View, Image, Button, Text } from "react-native";

import { connect } from "react-redux";

import JogoNovaPartida from "./JogoNovaPartida";

import JogoConfirmaPresenca from "./JogoConfirmaPresenca";

import MarcarJogadoresPresentesADM from "./MarcarJogadoresPresentesADM";

import TimeLista from "./TimeLista";

import { 
    setEstagio, 
    desativarPartida, 
    watchJogadoresFromSelectedGrupo, 
    contabilizarFinanceiro 
} from "../../actions";

class Jogo extends React.Component {
    componentDidMount() {
        if (this.props.grupoSelected !== null) {
            this.props.watchJogadoresFromSelectedGrupo();
        }
    }

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
            if (grupoSelected.estagio === 0) {
                return (
                    <View style={styles.card}>
                        <Text style={{fontSize: 25}}>Nenhum jogo marcado</Text>
                    </View>
                )
            }
            return (
                <View style={styles.card}>
                    <Text style={{fontSize: 25}}>Jogo em andamento</Text>
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
        const { 
            grupoSelected, 
            setEstagio, 
            desativarPartida, 
            jogador, 
            contabilizarFinanceiro, 
            navigation 
        } = this.props;

        if (grupoSelected === null) {
            return (
                <View style={styles.container_center}>
                    <Text>Primeiro selecione um grupo.</Text>
                </View>
            );
        }

        if (grupoSelected.id_lider === jogador.id_user) {
            if (grupoSelected.estagio === 1) {
                return (
                    <JogoNovaPartida 
                        onPress={() => {
                            grupoSelected.estagio = 2;
                            this.forceUpdate();
                        }} />
                );
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
                            await contabilizarFinanceiro();
                            await desativarPartida();
                            grupoSelected.estagio = 0;
                            this.forceUpdate();
                        }} />
                )
            }
        }

        // CONFIRMAR PRESENÇA.
        if (grupoSelected.estagio === 2) {
            return (
                <JogoConfirmaPresenca
                    onPress={ async () => {
                        await setEstagio(3);
                        this.props.jogadoresFromSeletedGrupo.forEach(element => {
                            element.presenca_confirmada = false;
                        });
                        grupoSelected.estagio = 3;
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
    container_center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

function mapStateToProps(state) {
    return {
        grupoSelected: state.grupoSelected,
        jogador: state.jogador,
        jogadoresFromSeletedGrupo: state.jogadoresFromSeletedGrupo,
    }
}

const mapDispatchToProps = {
    watchJogadoresFromSelectedGrupo,
    setEstagio,
    desativarPartida,
    contabilizarFinanceiro,
}

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);