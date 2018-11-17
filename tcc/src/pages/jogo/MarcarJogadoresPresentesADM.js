import React from "react";

import { StyleSheet, View, FlatList, Button, ActivityIndicator, Text, Alert } from "react-native";

import { connect } from "react-redux";

import PlayerBeingItem from "../../components/PlayerBeingItem";

import { getJogadoresConfirmados, setFieldJogadorPresente, updateJogadoresPresentes } from "../../actions";

class MarcarJogadoresPresentesADM extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        }
    }

    componentDidMount() {
        this.props.getJogadoresConfirmados();
    }

    renderCriarTimesButton() {
        return (
            <View style={{paddingTop: 20}}>
                <Button
                    title='Definir os times' 
                    onPress={() => {
                        Alert.alert(
                            'Definir os times', 
                            `Deseja definir os times agora?`,
                            [{
                                text: 'Não',
                            },{
                                text: 'Sim',
                                onPress: async () => {
                                    await this.props.updateJogadoresPresentes();
                                    this.props.onPress();
                                },
                            }],
                            { cancelable: false }
                        )
                    }} />
            </View>
        );
    }

    render() {
        const { jogadoresConfirmados, setFieldJogadorPresente } = this.props;

        if (jogadoresConfirmados === null) {
            return <ActivityIndicator />;
        }

        return (
            <View>
                <View style={styles.titulo}>
                    <Text style={{fontSize: 30, color: 'gray'}}>
                        Jogadores Presentes
                    </Text>
                </View>

                <FlatList
                    data={jogadoresConfirmados}
                    renderItem={({ item, index }) => (
                        <PlayerBeingItem 
                            index={index} 
                            jogador={item} 
                            onPress={() => {
                                setFieldJogadorPresente(index, 'jogador_presente', item.jogador_presente ? false : true);
                            }} />
                    )}
                    keyExtractor={(item, id) => id.toString()}
                    ListHeaderComponent={props => (<View style={styles.marginTop} />)}
                    ListFooterComponent={props => (<View style={styles.marginBottom} />)}
                />

                { this.renderCriarTimesButton() }

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
    titulo: {
        paddingTop: 10,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

const mapDispatchToProps = {
    getJogadoresConfirmados,
    setFieldJogadorPresente,
    updateJogadoresPresentes,
}

const mapStateToProps = state => {
    return {
        jogadoresConfirmados: state.jogadoresConfirmados,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarcarJogadoresPresentesADM);