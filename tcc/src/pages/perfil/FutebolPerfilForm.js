import React from "react";
import { StyleSheet, 
    TextInput, 
    Picker,
    Button, 
    ScrollView, 
    KeyboardAvoidingView,
    ActivityIndicator,
    Alert
} from "react-native";

import { connect } from "react-redux";

import FormRow from "../../components/FormRow";
import { setField, alterarJogador } from "../../actions";

class FutebolPerfilForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
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

    render() {
        const { jogadorForm, setField, setFieldSegundoNivel } = this.props;

        return (
            <KeyboardAvoidingView 
                behavior='padding' 
                enabled
                keyboardVerticalOffset={150}>
                <ScrollView>
                    <FormRow first>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome"
                            value={jogadorForm.nome}
                            onChangeText={value => setField('nome', value)}
                        />
                    </FormRow> 
                    <FormRow>
                        <TextInput
                            style={styles.input}
                            placeholder="Idade"
                            value={jogadorForm.idade}
                            onChangeText={value => setField('idade', value)}
                        />
                    </FormRow>
                    <FormRow>
                        <Picker
                            selectedValue={jogadorForm.futebol.direcao_chute}
                            onValueChange={itemValue => setFieldSegundoNivel('futebol', 'direcao_chute', itemValue)}>
                            <Picker.Item label="Ambidestro" value="Ambidestro" />
                            <Picker.Item label="Destro" value="Destro" />
                            <Picker.Item label="Canhoto" value="Canhoto" />
                        </Picker>
                    </FormRow>
                    <FormRow>
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
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(FutebolPerfilForm);