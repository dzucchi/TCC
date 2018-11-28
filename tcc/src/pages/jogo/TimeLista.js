import React from "react";

import { 
    StyleSheet, 
    View, 
    FlatList, 
    Button, 
    ActivityIndicator, 
    Text, 
    Alert,
} from "react-native";

import { connect } from "react-redux";

import TimeItem from "../../components/TimeItem";

import { getTimes } from "../../actions";

class TimeLista extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        }
    }

    componentDidMount() {
        this.props.getTimes();
    }

    renderCriarTimeButton() {
        return (
            <View style={{paddingTop: 20}}>
                <Button
                    title='Criar time' 
                    onPress={() => this.props.navigation.navigate('TimeForm')} />
            </View>
        );
    }

    renderRegistrarResultadoButton() {
        return (
            <View style={{paddingTop: 20}}>
                <Button
                    title='Registrar resultado'
                    onPress={() => {
                        if (this.props.times && this.props.times.length > 1){
                            this.props.navigation.navigate('ResultadoForm');
                        } else {
                            Alert.alert(
                                'Resultado',
                                'É necessário pelo menos dois times para registrar o resultado.',
                                [{ text: 'OK' }],
                                { cancelable: false }
                            );
                        }
                    }}
                />
            </View>
        );
    }

    renderEncerrarJogoButton() {
        return (
            <View style={{paddingTop: 20}}>
                <Button
                    title='Encerrar partida'
                    color='red'
                    onPress={() => {
                        Alert.alert(
                            'Encerrar partida', 
                            `Deseja encerrar a partida?`,
                            [{
                                text: 'Não',
                            },{
                                text: 'Sim',
                                onPress: () => {
                                    this.props.onPress();
                                },
                            }],
                            { cancelable: false }
                        )
                    }}/>
            </View>
        );
    }

    render() {
        const { times } = this.props;

        if (times === null) {
            return <ActivityIndicator />;
        }

        return (
            <View>
                <View style={styles.titulo}>
                    <Text style={{fontSize: 30, color: 'gray'}}>
                        Times
                    </Text>
                </View>
                <FlatList
                    data={times}
                    renderItem={({ item }) => (
                        <TimeItem 
                            time={item} />
                    )}
                    keyExtractor={(item, id) => id.toString()}
                    ListHeaderComponent={props => (<View style={styles.marginTop} />)}
                    ListFooterComponent={props => (<View style={styles.marginBottom} />)}
                />

                { this.renderCriarTimeButton() }
                { this.renderRegistrarResultadoButton() }
                { this.renderEncerrarJogoButton() }
                
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
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

const mapDispatchToProps = {
    getTimes,
}

const mapStateToProps = state => {
    return {
        times: state.times,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeLista);