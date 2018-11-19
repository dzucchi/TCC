import React from "react";

import { connect } from "react-redux";

import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";

import { getNomeTime } from "../actions";

class PartidaItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        }
    }

    teste(partida) {
        console.log('>> ', Object.values(partida.resultados))
        Object.values(partida.resultados).forEach(resultado => {
            console.log('POHA ', partida.id,'  ', resultado.time_1)
            this.props.getNomeTime(partida.id, resultado.time_1).then((nome) => {
                if (nome) {
                    console.log('NOME ', nome)
                } else {
                    console.log('sem nome')
                }
            });
        });
        
        // getNomeTime(partida.resultados[0].time_1).then((nome) => {
        //     if (nome) {
        //         console.log('NOME ', nome)
        //     } else {
        //         console.log('sem nome')
        //     }
        // });
    }

    render() {

        const { partida, onPress, getNomeTime } = this.props;

        const resultados = Object.values(partida.resultados);

        return (
            <TouchableOpacity
                onPress={onPress} 
            >
                <View>
                    <FlatList
                        data={resultados}
                        renderItem={( {item} ) => (
                            console.log('RESULTADO ', item)
                        )}
                        keyExtractor={(item, id) => id.toString()}
                        ListHeaderComponent={props => (<View style={styles.marginTop} />)}
                        ListFooterComponent={props => (<View style={styles.marginBottom} />)}
                    />               
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

        flexDirection: 'row',
        paddingTop: 3,
        paddingBottom: 3,
    },
   texto: {
        fontSize: 18,
        paddingLeft: 5,
    },
});

const mapDispatchToProps = {
    getNomeTime,
}

const mapStateToProps = state => {
    return {
        partidas: state.partidas,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PartidaItem);