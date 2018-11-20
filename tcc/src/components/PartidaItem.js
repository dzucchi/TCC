import React from "react";

import { connect } from "react-redux";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class PartidaItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        }
    }

    render() {

        const { resultado } = this.props;      
    
        return (
            <TouchableOpacity>
                <View style={styles.container}>
                    <View style={styles.label_data}>
                        <Text>{resultado.data}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 2}}>
                            <Text style={styles.texto}>{resultado.nome_time_1}</Text>
                            <Text style={styles.texto}>{resultado.nome_time_2}</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={styles.texto}>{resultado.gol_time_1}</Text>
                            <Text style={styles.texto}>{resultado.gol_time_2}</Text>
                        </View>
                    </View>
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
    },
    label_data: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const mapDispatchToProps = {
}

const mapStateToProps = state => {
    return {
        partidas: state.partidas,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PartidaItem);