import React from "react";

import { connect } from "react-redux";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class GrupoItem extends React.Component {

    render() {
        const { grupo, onPress, grupoSelected } = this.props;

        let isGrupo = false;
        if (grupoSelected !== null) {
            if (grupo.id === grupoSelected.id) {
                isGrupo = true;
            } else {
                isGrupo = false;
            }
        }

        return (
            <TouchableOpacity
                onPress={onPress} 
            >
                <View style={styles.container}>
                    <Text style={[styles.texto, isGrupo ? styles.negrito : null]}>
                        { grupo.nome }
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

        flexDirection: 'row',
        paddingTop: 3,
        paddingBottom: 3,
    },
   texto: {
        fontSize: 18,
        paddingLeft: 5,
    },
    negrito: {
        fontWeight: 'bold',
    }
});

const mapDispatchToProps = {
    
}

const mapStateToProps = state => {
    return {
        grupoSelected: state.grupoSelected,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GrupoItem);