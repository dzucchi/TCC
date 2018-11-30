import React from "react";

import { StyleSheet, View, ActivityIndicator, Text, FlatList } from "react-native";

import { connect } from "react-redux";

import { NavigationEvents } from "react-navigation";

import JogadorSaldoItem from "../../components/JogadorSaldoItem";

import PlayerBeingItem from "../../components/PlayerBeingItem";

import {
    getJogadoresFinanceiro, 
    setFieldJogadorFinanceiro,
    setJogadorFinanceiro,
    getPartidas
} from "../../actions";

class Financeiro extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
        }
    }

    componentDidMount() {
        if (this.props.grupoSelected !== null) {
            this.props.getJogadoresFinanceiro();
            this.props.getPartidas();
        }
    }

    render() {
        const {
            jogadoresFromSeletedGrupo, 
            jogadoresFinanceiro, 
            grupoSelected,
            setFieldJogadorFinanceiro,
            setJogadorFinanceiro,
            partidas,
            jogador,
        } = this.props;

        if (grupoSelected === null) {
            return (
                <View style={styles.container_center}>
                    <Text>Primeiro selecione um grupo.</Text>
                </View>
            );
        }

        if (jogadoresFromSeletedGrupo === null || jogadoresFinanceiro === null || partidas === null) {
            return <ActivityIndicator />;
        }

        if ((grupoSelected.id_lider === jogador.id_user) && grupoSelected.estagio === 4) {

            let gastoPartida = 0;
            partidas.forEach(element => {
                if (element.ativa) {
                    gastoPartida = parseFloat(element.valor_gastos);
                }
            });
            const qtdJogadores = jogadoresFinanceiro.length;
            const valorRateio = gastoPartida / qtdJogadores;

            return (
                <View>
                    <NavigationEvents
                        onWillFocus={async () => {
                            await this.props.getJogadoresFinanceiro();
                            await this.props.getPartidas();
                        }}
                    />
                    <View style={styles.titulo}>
                        <Text style={{fontSize: 25, color: 'gray'}}>
                            {'VALOR À PAGAR: '}
                            <Text style={{color: 'red'}}>
                                {`R$${valorRateio.toFixed(2)}`}
                            </Text>
                        </Text>
                    </View>

                    <FlatList
                        data={jogadoresFinanceiro}
                        renderItem={({ item, index }) => (
                            <PlayerBeingItem 
                                index={index} 
                                jogador={item}
                                jogador_financeiro
                                onPress={() => {
                                    setFieldJogadorFinanceiro(index, 'valor_pago', item.valor_pago ? false : true);
                                    setJogadorFinanceiro(index, item.valor_pago ? false : true);
                                }} />
                        )}
                        keyExtractor={(item, id) => id.toString()}
                        ListHeaderComponent={props => (<View style={styles.marginTop} />)}
                        ListFooterComponent={props => (<View style={styles.marginBottom} />)}
                    />
                </View>
            );
        }

        return (
            <View>
                <NavigationEvents
                    onWillFocus={async () => {
                        await this.props.getJogadoresFinanceiro();
                    }}
                />
                <FlatList
                    data={jogadoresFromSeletedGrupo}
                    renderItem={({ item }) => (
                        <JogadorSaldoItem jogador={item}/>
                    )}
                    keyExtractor={(item, id) => id.toString()}
                    ListHeaderComponent={props => (<View style={styles.marginTop} />)}
                    ListFooterComponent={props => (<View style={styles.marginBottom} />)}
                />
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
    titulo: {
        paddingTop: 10,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

function mapStateToProps(state) {
    return {
        jogadoresFromSeletedGrupo: state.jogadoresFromSeletedGrupo,
        grupoSelected: state.grupoSelected,
        jogadoresFinanceiro: state.jogadoresFinanceiro,
        partidas: state.partidas,
        jogador: state.jogador,
    }
}

const mapDispatchToProps = {
    getJogadoresFinanceiro,
    setFieldJogadorFinanceiro,
    setJogadorFinanceiro,
    getPartidas,
}

export default connect(mapStateToProps, mapDispatchToProps)(Financeiro);