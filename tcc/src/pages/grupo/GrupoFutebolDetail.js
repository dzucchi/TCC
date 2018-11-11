import React from "react";
import {
    Button, 
    ScrollView, 
} from "react-native";

import { connect } from "react-redux";

import Line from "../../components/Line";

class GrupoFutebolDetail extends React.Component {
    renderButton() {
        const { navigation, grupoSelected, jogador } = this.props;

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
        grupoSelected: state.grupoSelected,
        jogador: state.jogador,
    }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(GrupoFutebolDetail);