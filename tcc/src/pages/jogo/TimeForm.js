import React from "react";

import { StyleSheet, View, FlatList, Button, TextInput, ActivityIndicator } from "react-native";

import { connect } from "react-redux";

import PlayerBeingItem from "../../components/PlayerBeingItem";

import { getJogadoresDisponiveisTime, setFieldJogadorDisponivel, saveTime } from "../../actions";

class TimeForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            time_nome: '',
        }
    }

    componentDidMount() {
        this.props.getJogadoresDisponiveisTime();
    }

    renderButton() {
        return (
            <View style={{paddingTop: 20}}>
                <Button
                    title='Salvar' 
                    onPress={ async () => {
                        await this.props.saveTime(this.state.time_nome);
                        this.props.navigation.goBack();
                    }} />
            </View>
        );
    }

    onChangeHandler(field, value) {
        this.setState({
           [field]: value 
        });
    }

    render() {
        const { jogadoresDisponiveisTime, setFieldJogadorDisponivel } = this.props;

        if (jogadoresDisponiveisTime === null) {
            return <ActivityIndicator />;
        }

        return (
            <View>
                <View style={styles.container_input}>
                    <TextInput 
                        style={styles.input}
                        placeholder="Nome do time"
                        value={this.state.time_nome}
                        onChangeText={value => this.onChangeHandler('time_nome', value)}
                    />
                </View>

                <FlatList
                    data={jogadoresDisponiveisTime}
                    renderItem={({ item, index }) => (
                        <PlayerBeingItem
                            jogador_escalado
                            index={index} 
                            jogador={item} 
                            onPress={() => {
                                setFieldJogadorDisponivel(index, 'jogador_escalado', item.jogador_escalado ? false : true);
                            }} />
                    )}
                    keyExtractor={(item, id) => id.toString()}
                    ListHeaderComponent={props => (<View style={styles.marginTop} />)}
                    ListFooterComponent={props => (<View style={styles.marginBottom} />)}
                />

                { this.renderButton() }

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
    },
    input: {
        paddingRight: 5,
        paddingBottom: 5,
        fontSize: 30,
    },
    container_input: {
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        elevation: 1
    }
})

const mapDispatchToProps = {
    getJogadoresDisponiveisTime,
    setFieldJogadorDisponivel,
    saveTime,
}

const mapStateToProps = state => {
    return {
        jogadoresDisponiveisTime: state.jogadoresDisponiveisTime,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeForm);