import React from "react";

import { connect } from "react-redux";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class GrupoItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSelected: false
        }
    }

    render() {
        const { grupo, onPress, grupoSelected } = this.props;

        if (grupoSelected !== null) {
            if (grupo.id === grupoSelected.id) {
                this.setState({isSelected: true});
            } else {
                this.setState({isSelected: false});
            }
        }

        return (
            <TouchableOpacity
                onPress={onPress} 
            >
                <View style={styles.container}>
                    <Text style={[styles.texto, this.state.isSelected ? styles.negrito : null]}>
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