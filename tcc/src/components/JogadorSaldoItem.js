import React from "react";

import { connect } from "react-redux";

import { View, Text, StyleSheet } from "react-native";

class JogadorSaldoItem extends React.Component {

    render() {
        const { jogador, grupoSelected } = this.props;

        let valor = 0;
        const id_grupo = grupoSelected.id;
        if (jogador.financeiro) {
            const arrayFinanceiro = Object.keys(jogador.financeiro);
            if (arrayFinanceiro) {
                arrayFinanceiro.forEach((grupoKey) => {
                    if (grupoKey === id_grupo) {
                        valor = jogador.financeiro[grupoKey].valor;
                        if (!valor) valor = 0;
                    }
                });
            }
        }

        return (
            <View style={styles.line}>
                <View>
                    <Text style={styles.nome}>
                        { jogador.nome }
                    </Text>
                    <Text style={styles.posicao}>
                        { jogador.futebol.posicao }
                    </Text>
                </View>

                <View style={styles.valores}>
                    <Text style={[styles.valor, parseFloat(valor) < 0 ? styles.valor_menor : styles.valor_maior]}>
                        { valor === 0 ? '0.00' : valor }
                    </Text>
                    <View style={{marginTop: 5}}></View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    line: {
        paddingTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nome: {
        fontSize: 25,
        paddingLeft: 5,
    },
    posicao: {
        paddingLeft: 5,
    },
    valores: {
        padding: 10,
    },
    valor: {
        fontSize: 20,
    },
    valor_maior: {
        color: 'green',
    },
    valor_menor: {
        color: 'red',
    }
});

mapStateToProps = (state) => {
    return {
        grupoSelected: state.grupoSelected,
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(JogadorSaldoItem);