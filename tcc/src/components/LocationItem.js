import React from "react";

import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { connect } from "react-redux";

import { setFieldGrupo, setFieldPartida } from "../actions";

class LocationItem extends React.Component {
    _handlePress = async () => {
        const { setFieldGrupo, setFieldPartida, fetchDetails, onPress, isPartida } = this.props;
        const res = await fetchDetails(this.props.place_id)
        const { lat, lng } = res.geometry.location;
        this.props.inputValue = res.formatted_address;
        if (isPartida) {
            setFieldPartida('localizacao', { lat, lng });
            setFieldPartida('endereco', res.formatted_address);
        } else {
            setFieldGrupo('localizacao', { lat, lng });
            setFieldGrupo('endereco', res.formatted_address);
        }
        onPress();
    }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this._handlePress}>
                <Text>{this.props.description}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
    }
})


const mapDispatchToProps = {
    setFieldGrupo,
    setFieldPartida,
}

export default connect(null, mapDispatchToProps)(LocationItem);