import React from "react";

import { connect } from "react-redux";

import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

import { setJogadorAoGrupo, desativarNotificacao } from "../actions";

class NotificacaoItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        }
    }

    render() {
        const { notificacao, setJogadorAoGrupo, desativarNotificacao, navigation } = this.props;      
    
        return (
            <TouchableOpacity
                onPress={() => {
                    const { id, id_jogador, uid_jogador, id_grupo, id_lider_grupo } = notificacao;
                    Alert.alert(
                        'Solicitacão', 
                        `Permitir que o jogador entre no seu grupo?`,
                        [{
                            text: 'Não',
                            onPress: async () => {
                                await desativarNotificacao(id_lider_grupo, id);
                            }
                        },{
                            text: 'Sim',
                            onPress: async () => {
                                await setJogadorAoGrupo(id_jogador, uid_jogador, id_grupo);
                                await desativarNotificacao(id_lider_grupo, id);
                            },
                        }]
                    )
                }}
            >
                <View style={styles.container}>
                    <Text style={styles.texto}>
                        O jogador {notificacao.nome_jogador} deseja entrar no seu grupo {notificacao.nome_grupo}.
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        marginTop: 5,
        marginBottom: 5,
        elevation: 1,

        paddingTop: 3,
        paddingBottom: 3,
    },
    texto: {
        fontSize: 18,
    }
});

const mapDispatchToProps = {
    setJogadorAoGrupo,
    desativarNotificacao,
}

const mapStateToProps = state => {
    return {
        partidas: state.partidas,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificacaoItem);