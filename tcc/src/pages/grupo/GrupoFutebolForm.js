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
    Alert,
    View,
    CheckBox
} from "react-native";

import { connect } from "react-redux";

import DateTimePicker from "react-native-modal-datetime-picker";

import moment from 'moment';

import { GoogleAutoComplete } from "react-native-google-autocomplete";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import FormRow from "../../components/FormRow";

import { setFieldGrupo, saveGrupo, setWholeGrupo, resetForm } from "../../actions";

import LocationItem from "../../components/LocationItem";

class GrupoFutebolForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isVisible1: false,
            isVisible2: false,
            chosenDate: '',
            checked: false,
        }
    }

    componentDidMount() {
        const { navigation, setWholeGrupo, resetForm } = this.props;
        const { params } = navigation.state;
        if (params && params.grupoToEdit) {
            setWholeGrupo(params.grupoToEdit);
        } else {
            resetForm();
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
                        const { saveGrupo, grupoForm, navigation } = this.props;
                        await saveGrupo(grupoForm);
                        navigation.navigate('Main');
                    } catch (error) {
                        Alert.alert('Ops.. Erro :(', error.message)
                    } finally {
                        this.setState({ isLoading: false })
                    }
                }} />
            );
    }

    handlePicker1 = (time) => {
        this.props.grupoForm.hora_inicio = moment(time).format('HH:mm')
        this.setState({
            isVisible1: false,
        })
    }
    showPicker1 = () => {
        this.setState({
            isVisible1: true
        })
    }
    hidePicker1 = () => {
        this.setState({
            isVisible1: false
        })
    }
    handlePicker2 = (time) => {
        this.props.grupoForm.hora_fim = moment(time).format('HH:mm')
        this.setState({
            isVisible2: false,
        })
    }
    showPicker2 = () => {
        this.setState({
            isVisible2: true
        })
    }
    hidePicker2 = () => {
        this.setState({
            isVisible2: false
        })
    }

    render() {
        const { grupoForm, setFieldGrupo } = this.props;

        return (
            <KeyboardAwareScrollView
                style={{flex: 1}}
            >
                <ScrollView>
                    <FormRow first>
                        <Text style={styles.labelfixed}>Nome do grupo</Text>
                        <TextInput
                            style={styles.input}
                            value={grupoForm.nome}
                            onChangeText={value => setFieldGrupo('nome', value)}
                        />
                    </FormRow>

                    <FormRow>
                        <Text style={styles.labelfixed}>Localizar endereço</Text>
                        <GoogleAutoComplete 
                            apiKey="AIzaSyCXjQR2IrF0tWKliRccy_CUkX-__qynY1Y" 
                            debounce={500} 
                            minLength={3} 
                            query={{
                                key: "AIzaSyCXjQR2IrF0tWKliRccy_CUkX-__qynY1Y",
                                language: 'pt-br',
                            }}
                            currentLocation={true}
                            components="country:br"
                        >
                            {({ 
                                handleTextChange, 
                                inputValue,
                                locationResults, 
                                fetchDetails,
                                isSearching,
                                clearSearchs
                            }) => (
                                <React.Fragment>
                                    <View>
                                        <TextInput
                                            onChangeText={(value) => {
                                                setFieldGrupo('endereco', value);
                                                handleTextChange(value);
                                            }}
                                            value={grupoForm.endereco}
                                            returnKeyType='search'
                                        />
                                    </View>
                                    {isSearching && <ActivityIndicator size="large" />}
                                    <ScrollView>
                                        {locationResults.map(el => (
                                            <LocationItem
                                                {...el}
                                                key={el.id}
                                                fetchDetails={fetchDetails}
                                                inputValue={grupoForm.endereco}
                                                onPress={() => {
                                                    inputValue = grupoForm.endereco;
                                                    clearSearchs()
                                                }}
                                            />
                                        ))}
                                    </ScrollView>
                                </React.Fragment>
                            )}
                        </GoogleAutoComplete>
                    </FormRow>

                    <FormRow>
                        <Text style={styles.labelfixed}>Categoria</Text>
                        <Picker
                            selectedValue={grupoForm.categoria}
                            onValueChange={itemValue => setFieldGrupo('categoria', itemValue)}>
                            <Picker.Item label="Society" value="Society" />
                            <Picker.Item label="Salão" value="Salão" />
                            <Picker.Item label="Campo" value="Campo" />
                        </Picker>
                    </FormRow>

                    <FormRow>
                        <Text style={styles.labelfixed}>Dia da semana</Text>
                        <Picker
                            selectedValue={grupoForm.dia_da_semana}
                            onValueChange={itemValue => setFieldGrupo('dia_da_semana', itemValue)}>
                            <Picker.Item label="Segunda-feira" value="Segunda-feira" />
                            <Picker.Item label="Terça-feira" value="Terça-feira" />
                            <Picker.Item label="Quarta-feira" value="Quarta-feira" />
                            <Picker.Item label="Quinta-feira" value="Quinta-feira" />
                            <Picker.Item label="Sexta-feira" value="Sexta-feira" />
                            <Picker.Item label="Sábado" value="Sábado" />
                            <Picker.Item label="Domingo" value="Domingo" />
                        </Picker>
                    </FormRow>

                    <FormRow>
                        <TouchableOpacity onPress={this.showPicker1}>
                            <Text style={styles.labelfixed}>Hora início</Text>
                            <Text>
                                {grupoForm.hora_inicio}
                            </Text>
                        </TouchableOpacity>

                        <DateTimePicker
                            isVisible={this.state.isVisible1}
                            onConfirm={this.handlePicker1}
                            onCancel={this.hidePicker1}
                            mode={'time'}
                        />
                    </FormRow>

                    <FormRow>
                        <TouchableOpacity onPress={this.showPicker2}>
                            <Text style={styles.labelfixed}>Hora fim</Text>
                            <Text>
                                {grupoForm.hora_fim}
                            </Text>
                        </TouchableOpacity>

                        <DateTimePicker
                            isVisible={this.state.isVisible2}
                            onConfirm={this.handlePicker2}
                            onCancel={this.hidePicker2}
                            mode={'time'}
                        />
                    </FormRow>

                    <FormRow>
                        <Text style={styles.labelfixed}>Tornar o grupo privado?</Text>
                        <View style={{ flexDirection: 'column'}}>
                            <View style={{ flexDirection: 'row' }}>
                                <CheckBox
                                    value={grupoForm.privado}
                                    onValueChange={itemValue => setFieldGrupo('privado', itemValue)}
                                />
                                <Text style={{marginTop: 5}}></Text>
                            </View>
                        </View>
                    </FormRow>

                    { this.renderButton() }
                </ScrollView>
            </KeyboardAwareScrollView>
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
        grupoForm: state.grupoForm
    }
}

const mapDispatchToProps = {
    setFieldGrupo,
    saveGrupo,
    setWholeGrupo,
    resetForm,
}

export default connect(mapStateToProps, mapDispatchToProps)(GrupoFutebolForm);