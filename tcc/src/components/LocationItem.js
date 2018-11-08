import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { connect } from "react-redux";

import { setFieldGrupo } from "../actions";

class LocationItem extends React.Component {
    _handlePress = async () => {
        const { setFieldGrupo, fetchDetails, onPress } = this.props;
        const res = await fetchDetails(this.props.place_id)
        const { lat, lng } = res.geometry.location;
        this.props.inputValue = res.formatted_address;
        setFieldGrupo('localizacao', { lat, lng });
        setFieldGrupo('endereco', res.formatted_address)
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
}

export default connect(null, mapDispatchToProps)(LocationItem);