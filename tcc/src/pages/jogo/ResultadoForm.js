import React from "react";

import { StyleSheet, View, Picker, Button, ActivityIndicator, Text, Alert } from "react-native";

import NumericInput from "react-native-numeric-input";

import { connect } from "react-redux";

import { getTimes, saveResultado } from "../../actions";

class TimeLista extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            time1_selected: '',
            time2_selected: '',
            v1: 0,
            v2: 0,
        }
    }

    componentDidMount() {
        this.props.getTimes();
    }

    validarTimes() {
        const { times } = this.props;
        const { time1_selected, time2_selected, v1, v2 } = this.state;

        if (time1_selected === '') {
            this.setState({time1_selected: times[0].id});
        }

        if (time2_selected === '') {
            this.setState({time2_selected: times[0].id});
        }

        if (time1_selected === time2_selected) {
            Alert.alert(
                'Resultado',
                'Os times devem ser diferentes.',
                [{ text: 'OK' }],
                { cancelable: false }
            );
            return false;
        }
        if (v1 < 0 || v2 < 0) {
            Alert.alert(
                'Resultado',
                'Resultado não pode ser negativo.',
                [{ text: 'OK' }],
                { cancelable: false }
            );
            return false;
        }
        return true;
    }

    renderButton() {
        const { saveResultado } = this.props;

        if (this.state.isLoading)
            return <ActivityIndicator />;
        return (
            <View style={{paddingTop: 20}}>
                <Button
                    title='Salvar' 
                    onPress={ async () => {
                        if (this.validarTimes()) {
                            const { time1_selected, time2_selected, v1, v2 } = this.state;

                            let time1 = time1_selected === '' ? this.props.times[0].id : time1_selected;
                            let time2 = time2_selected === '' ? this.props.times[0].id : time2_selected;
                            
                            this.setState({ isLoading: true });
                            await saveResultado(time1, time2, v1, v2);
                            this.props.navigation.goBack();
                        }
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

                <View style={[styles.container, {paddingTop: 20}]}>
                    <Picker
                        selectedValue={this.state.time1_selected}
                        style={styles.picker}
                        onValueChange={itemValue => this.setState({time1_selected: itemValue})}>
                        {times.map(item => {
                            return (<Picker.Item label={item.nome} value={item.id} key={item.id}/>)
                        })}
                    </Picker>

                    <NumericInput 
                        style={styles.numeric_input}
                        initValue={this.state.v1}
                        value={this.state.v1}
                        onChange={(v1) => this.setState({ v1 })}
                        totalWidth={150} 
                        totalHeight={50} 
                        iconSize={25}
                        valueType='real'
                        rounded
                        iconStyle={{ color: 'white' }}
                        rightButtonBackgroundColor='#EA3788' 
                        leftButtonBackgroundColor='#E56B70'
                    />
                </View>

                <View style={styles.label_vs}>
                    <Text style={{color: 'red'}}>vs</Text>
                </View>

                <View style={styles.container}>
                    <Picker
                        selectedValue={this.state.time2_selected}
                        style={styles.picker}
                        onValueChange={itemValue => this.setState({time2_selected: itemValue})}>
                        {times.map(item => {
                            return (<Picker.Item label={item.nome} value={item.id} key={item.id}/>)
                        })}
                    </Picker>

                    <NumericInput 
                        style={styles.numeric_input}
                        initValue={this.state.v2}
                        value={this.state.v2}
                        onChange={(v2) => this.setState({ v2 })}
                        totalWidth={150} 
                        totalHeight={50} 
                        iconSize={25}
                        valueType='real'
                        rounded
                        iconStyle={{ color: 'white' }}
                        rightButtonBackgroundColor='#EA3788' 
                        leftButtonBackgroundColor='#E56B70'
                    />
                </View>
                
                { this.renderButton() }
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    picker: {
        height: 50,
        flex: 2,
    },
    numeric_input: {
        flex: 1,
    },
    container: {
        flexDirection: 'row',
    },
    label_vs: {
        padding: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const mapDispatchToProps = {
    getTimes,
    saveResultado,
}

const mapStateToProps = state => {
    return {
        times: state.times,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeLista);