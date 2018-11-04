import React from "react";
import { 
    StyleSheet, 
    Text,
    TextInput, 
    Picker,
    Button, 
    ScrollView, 
    TouchableOpacity,
    ActivityIndicator,
    Alert
} from "react-native";

import { connect } from "react-redux";

import DateTimePicker from "react-native-modal-datetime-picker";

import FormRow from "../../components/FormRow";
import { setField, setFieldSegundoNivel, alterarJogador } from "../../actions";

import moment from 'moment';

class PerfilFutebolForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isVisible: false,
            chosenDate: '',
        }
    }

    renderButton() {
        if (this.state.isLoading) {
            return <ActivityIndicator />
        } 
        return (
            <Button
                title="Salvar"
                onPress={async() => {
                    this.setState({ isLoading: true })
                    try {
                        const { alterarJogador, jogadorForm, navigation } = this.props;
                        await alterarJogador(jogadorForm);
                        navigation.goBack();
                    } catch (error) {
                        Alert.alert('Ops.. Erro :(', error.message)
                    } finally {
                        this.setState({ isLoading: false })
                    }
                }} />
            );
    }

    handlePicker = (date) => {
        this.props.jogadorForm.idade = moment(date).format('DD/MM/YYYY')
        this.setState({
            isVisible: false,
        })
    }

    showPicker = () => {
        this.setState({
            isVisible: true
        })
    }

    hidePicker = () => {
        this.setState({
            isVisible: false
        })
    }

    render() {
        const { jogadorForm, setField, setFieldSegundoNivel } = this.props;

        return (
            <ScrollView>
                <FormRow first>
                    <Text style={styles.labelfixed}>Nome</Text>
                    <TextInput
                        style={styles.input}
                        value={jogadorForm.nome}
                        onChangeText={value => setField('nome', value)}
                    />
                </FormRow> 
                <FormRow>
                    <TouchableOpacity onPress={this.showPicker}>
                        <Text style={styles.labelfixed}>Data de nascimento</Text>
                        <Text>
                            
                            {jogadorForm.idade}
                        </Text>
                    </TouchableOpacity>

                    <DateTimePicker
                        isVisible={this.state.isVisible}
                        onConfirm={this.handlePicker}
                        onCancel={this.hidePicker}
                        mode={'date'}
                    />
                </FormRow>
                <FormRow first>
                    <Text style={styles.labelfixed}>Estado</Text>
                    <TextInput
                        style={styles.input}
                        value={jogadorForm.estado}
                        onChangeText={value => setField('estado', value)}
                    />
                </FormRow>
                <FormRow first>
                    <Text style={styles.labelfixed}>Cidade</Text>
                    <TextInput
                        style={styles.input}
                        value={jogadorForm.cidade}
                        onChangeText={value => setField('cidade', value)}
                    />
                </FormRow>
                <FormRow>
                <Text style={styles.labelfixed}>Direção chute</Text>
                    <Picker
                        selectedValue={jogadorForm.futebol.direcao_chute}
                        onValueChange={itemValue => setFieldSegundoNivel('futebol', 'direcao_chute', itemValue)}>
                        <Picker.Item label="Ambidestro" value="Ambidestro" />
                        <Picker.Item label="Destro" value="Destro" />
                        <Picker.Item label="Canhoto" value="Canhoto" />
                    </Picker>
                </FormRow>
                <FormRow>
                <Text style={styles.labelfixed}>Posição</Text>
                    <Picker
                        selectedValue={jogadorForm.futebol.posicao}
                        onValueChange={itemValue => setFieldSegundoNivel('futebol', 'posicao', itemValue)}>
                        <Picker.Item label="Goleiro" value="Goleiro" />
                        <Picker.Item label="Zagueiro" value="Zagueiro" />
                        <Picker.Item label="Lateral" value="Lateral" />
                        <Picker.Item label="Volante" value="Volante" />
                        <Picker.Item label="Meia" value="Meia" />
                        <Picker.Item label="Atacante" value="Atacante" />
                        <Picker.Item label="Ala" value="Ala" />
                        <Picker.Item label="Pivô" value="Pivô" />
                        <Picker.Item label="Fixo" value="Fixo" />
                    </Picker>
                </FormRow>
                { this.renderButton() }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
    },
    labelfixed: {
        color: '#778899',
    }
});

function mapStateToProps(state) {
    return {
        jogadorForm: state.jogador
    }
}

const mapDispatchToProps = {
    setField,
    setFieldSegundoNivel,
    alterarJogador,
}

export default connect(mapStateToProps, mapDispatchToProps)(PerfilFutebolForm);