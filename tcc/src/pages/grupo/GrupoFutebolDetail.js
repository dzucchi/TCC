import React from "react";
import {
    Button, 
    ScrollView,
    ActivityIndicator,
    Alert,
} from "react-native";

import { connect } from "react-redux";

import Line from "../../components/Line";

import { saveNotificacao } from "../../actions";

class GrupoFutebolDetail extends React.Component {

    entrarNoGrupo() {
        const { grupoSearched, saveNotificacao, jogador, navigation } = this.props;

        let possuiJogador = false;
        Object.keys(grupoSearched.jogadores).forEach((key) => {
            if (key === jogador.id_user) {
                possuiJogador = true;
            }
        });
        if (possuiJogador) {
            Alert.alert('', 'Já faz parte deste grupo');
        } else {
            const { id_lider, id, nome } = grupoSearched;
            saveNotificacao(id_lider, id, nome, jogador.id_user, jogador.id, jogador.nome);
            Alert.alert('', 'Solicitação enviada.')
            navigation.navigate('Main');
        }
    }

    renderButton() {
        const { navigation, grupoSelected, grupoSearched, jogador } = this.props;

        if (navigation.state.params && navigation.state.params.id_grupo) {
            if (grupoSearched.privado) {
                return;
            }
            return (
                <Button
                    title="Entrar no grupo"
                    color='green'
                    onPress={() => {
                        Alert.alert(
                            'Entrar no grupo', 
                            `Deseja solicitar a entrada no grupo?`,
                            [{
                                text: 'Não',
                            },{
                                text: 'Sim',
                                onPress: () => {
                                    this.entrarNoGrupo();
                                },
                            }],
                            { cancelable: false }
                        )
                    }} />
                );
        } 
        if (grupoSelected.id_lider === jogador.id_user) {
            return (
                <Button
                    title="Editar"
                    onPress={async() => {
                        navigation.navigate('GrupoFutebolForm', { grupoToEdit: grupoSelected });
                    }} />
                );
        }
    }


    render() {    
        const { navigation } = this.props;
        if (navigation.state.params && navigation.state.params.id_grupo) {
            const { grupoSearched } = this.props;
            if (grupoSearched === null) {
                return <ActivityIndicator />;
            }
            return (
                <ScrollView>
                    <Line label="Nome do grupo" content={grupoSearched.nome}/>
                    <Line label="Endereço" content={grupoSearched.endereco}/>
                    <Line label="Categoria" content={grupoSearched.categoria}/>
                    <Line label="Dia da semana" content={grupoSearched.dia_da_semana}/>
                    <Line label="Hora início" content={grupoSearched.hora_inicio}/>
                    <Line label="Hora fim" content={grupoSearched.hora_fim}/>
                    <Line label="Privacidade" content={grupoSearched.privado ? 'Aberto' : 'Fechado'}/>

                    { this.renderButton() }

                </ScrollView>
            );
        }        

        const { grupoSelected } = this.props;
        return (
            <ScrollView>
                <Line label="Nome do grupo" content={grupoSelected.nome}/>
                <Line label="Endereço" content={grupoSelected.endereco}/>
                <Line label="Categoria" content={grupoSelected.categoria}/>
                <Line label="Dia da semana" content={grupoSelected.dia_da_semana}/>
                <Line label="Hora início" content={grupoSelected.hora_inicio}/>
                <Line label="Hora fim" content={grupoSelected.hora_fim}/>
                <Line label="Tornar o grupo privado?" content={grupoSelected.privado ? 'Sim' : 'Não'}/>

                { this.renderButton() }

            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {
        grupoSearched: state.grupoSearched,
        grupoSelected: state.grupoSelected,
        jogador: state.jogador,
    }
}

const mapDispatchToProps = {
    saveNotificacao
}

export default connect(mapStateToProps, mapDispatchToProps)(GrupoFutebolDetail);