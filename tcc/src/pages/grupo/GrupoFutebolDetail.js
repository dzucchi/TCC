import React from "react";
import { 
    StyleSheet,
    Text,
    Button, 
    ScrollView, 
} from "react-native";

import { connect } from "react-redux";

import Line from "../../components/Line";

class GrupoFutebolDetail extends React.Component {
    renderButton() {
        const { navigation, grupoSelected } = this.props;

        return (
            <Button
                title="Editar"
                onPress={async() => {
                    navigation.navigate('GrupoFutebolForm', { grupoToEdit: grupoSelected });
                }} />
            );
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

const styles = StyleSheet.create({
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
    },
    labelfixed: {
        color: '#778899',
    }
});

function mapStateToProps(state) {
    return {
        grupoSelected: state.grupoSelected
    }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(GrupoFutebolDetail);