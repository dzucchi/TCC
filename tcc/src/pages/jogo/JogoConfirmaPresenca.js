import React from "react";

import { StyleSheet, View, Text, FlatList, Button, ActivityIndicator } from "react-native";

import { connect } from "react-redux";

import { watchJogadoresFromSelectedGrupo, presenceUpdate } from "../../actions";

import JogadorItem from "../../components/JogadorItem";

class JogoConfirmaPresenca extends React.Component {

    componentDidMount() {
        this.props.watchJogadoresFromSelectedGrupo();
    }

    renderConfirmPresenceButton() {
        return (
            <View style={{paddingTop: 20}}>
                <Button
                    title='Confirmar presença' 
                    onPress={() => this.props.presenceUpdate()} />
            </View>
        );
    }

    render() {
        const { jogadoresFromSeletedGrupo } = this.props;

        if (jogadoresFromSeletedGrupo === null) {
            return <ActivityIndicator />;
        }

        return (
            <View>
                <FlatList
                    data={jogadoresFromSeletedGrupo}
                    renderItem={({ item }) => (
                        <JogadorItem jogador={item}/>
                    )}
                    keyExtractor={(item, id) => id.toString()}
                    ListHeaderComponent={props => (<View style={styles.marginTop} />)}
                    ListFooterComponent={props => (<View style={styles.marginBottom} />)}
                />

                { this.renderConfirmPresenceButton() }

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
})

const mapDispatchToProps = {
    watchJogadoresFromSelectedGrupo,
    presenceUpdate,
}

const mapStateToProps = state => {
    return {
        jogadoresFromSeletedGrupo: state.jogadoresFromSeletedGrupo,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JogoConfirmaPresenca);