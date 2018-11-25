import React from "react";

import { StyleSheet, View, FlatList, Button, ActivityIndicator, Alert } from "react-native";

import { connect } from "react-redux";

import { watchJogadoresFromSelectedGrupo, presenceUpdate } from "../../actions";

import JogadorItem from "../../components/JogadorItem";

class JogoConfirmaPresenca extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        }
    }

    renderConfirmPresenceButton() {
        return (
            <View style={{paddingTop: 20}}>
                <Button
                    title='Confirmar presença' 
                    onPress={async () => {
                        await this.props.presenceUpdate();
                    }} />
            </View>
        );
    }

    renderIniciarJogoButton() {
        const { grupoSelected, jogador } = this.props;

        if (grupoSelected.id_lider === jogador.id_user) {
            return (
                <View style={{paddingTop: 10}}>
                    <Button
                        title='Iniciar Jogo' 
                        onPress={() => {
                            Alert.alert(
                                'Iniciar jogo', 
                                `Deseja encerrar o periodo de confirmação da presença dos jogadores?`,
                                [{
                                    text: 'Não',
                                },{
                                    text: 'Sim',
                                    onPress: async () => {
                                        this.props.onPress();
                                    },
                                }],
                                { cancelable: false }
                            )
                        }} />
                </View>
            );
        }
    }

    render() {
        const { jogadoresFromSeletedGrupo } = this.props;

        if (jogadoresFromSeletedGrupo === null) {
            return <ActivityIndicator />;
        }

        return (
            <View>
                <FlatList
                    data={jogadoresFromSeletedGrupo}
                    renderItem={({ item }) => (
                        <JogadorItem jogador={item}/>
                    )}
                    keyExtractor={(item, id) => id.toString()}
                    ListHeaderComponent={props => (<View style={styles.marginTop} />)}
                    ListFooterComponent={props => (<View style={styles.marginBottom} />)}
                />

                { this.renderConfirmPresenceButton() }
                { this.renderIniciarJogoButton() }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    marginTop: {
        marginTop: 5,
    },
    marginBottom: {
        marginBottom: 5,
    },
})

const mapDispatchToProps = {
    watchJogadoresFromSelectedGrupo,
    presenceUpdate,
}

const mapStateToProps = state => {
    return {
        grupoSelected: state.grupoSelected,
        jogador: state.jogador,
        jogadoresFromSeletedGrupo: state.jogadoresFromSeletedGrupo,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JogoConfirmaPresenca);