import React from "react";

import { 
    StyleSheet, 
    ScrollView, 
    Text,
    View,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    ActivityIndicator,
    Button,
} from "react-native";

import { connect } from "react-redux";

import DateTimePicker from "react-native-modal-datetime-picker";

import { GoogleAutoComplete } from "react-native-google-autocomplete";

import moment from 'moment';

import FormRow from "../../components/FormRow";

import LocationItem from "../../components/LocationItem";

import { setFieldPartida, savePartida } from "../../actions";

class JogoNovaPartida extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isVisible: false,
            isVisibleTime1: false,
            isVisibleTime2: false,
        }
    }

    handlePicker = (date) => {
        this.props.partida.dia_do_jogo = moment(date).format('DD/MM/YYYY');
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

    handlePickerTime1 = (time) => {
        this.props.partida.hora_inicio = moment(time).format('HH:mm')
        this.setState({
            isVisibleTime1: false,
        })
    }

    showPickerTime1 = () => {
        this.setState({
            isVisibleTime1: true
        })
    }

    hidePickerTime1 = () => {
        this.setState({
            isVisibleTime1: false
        })
    }

    handlePickerTime2 = (time) => {
        this.props.partida.hora_fim = moment(time).format('HH:mm')
        this.setState({
            isVisibleTime2: false,
        })
    }

    showPickerTime2 = () => {
        this.setState({
            isVisibleTime2: true
        })
    }

    hidePickerTime2 = () => {
        this.setState({
            isVisibleTime2: false
        })
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
                        const { savePartida, partida, navigation } = this.props;
                        await savePartida(partida);
                        navigation.navigate('JogoConfirmaPresenca');
                    } catch (error) {
                        Alert.alert('Ops.. Erro :(', error.message)
                    } finally {
                        this.setState({ isLoading: false })
                    }
                }} />
            );
    }

    atualizarFormByGrupoSelected() {
        const { grupoSelected, partida } = this.props;
        if (partida.dia_do_jogo === '')
            partida.dia_do_jogo = this.getDayOfGame(grupoSelected.dia_da_semana);
        if (partida.hora_inicio === '')
            partida.hora_inicio = grupoSelected.hora_inicio;
        if (partida.hora_fim === '')
            partida.hora_fim = grupoSelected.hora_fim;
        if (partida.localizacao.lat === 0) {
            partida.endereco = grupoSelected.endereco;
            partida.localizacao = grupoSelected.localizacao;
        }
    }

    getNextDayOfWeek(dayOfWeek) {
        let resultDate = new Date();
        resultDate.setDate(resultDate.getDate() + (7 + dayOfWeek - resultDate.getDay()) % 7);
        return resultDate;
    }

    getNumberFromDayWeek(dayWeek) {
        switch (dayWeek) {
            case 'Domingo':
                return 0;
            case 'Segunda-feira':
                return 1;
            case 'Terça-feira':
                return 2;
            case 'Quarta-feira':
                return 3;
            case 'Quinta-feira':
                return 4;
            case 'Sexta-feira':
                return 5;
            case 'Sábado':
                return 6;
            default:
                break;
        }
    }

    getDayOfGame(dia_da_semana) {
        const numberFromDayWeek = this.getNumberFromDayWeek(dia_da_semana);
        const date = this.getNextDayOfWeek(numberFromDayWeek);
        return moment(date).format('DD/MM/YYYY');
    }

    render() {
        const { setFieldPartida, partida } = this.props;

        this.atualizarFormByGrupoSelected();

        return (
            <KeyboardAvoidingView 
                behavior='padding' 
                enabled
                keyboardVerticalOffset={140}>

                <ScrollView>

                    <View style={styles.tituloForm}>
                        <Text style={{fontSize: 20}}>
                            Agendar Jogo
                        </Text>
                    </View>

                    <FormRow first>
                        <TouchableOpacity onPress={this.showPicker}>
                            <Text style={styles.labelfixed}>Dia do jogo</Text>
                            <Text>
                                { partida.dia_do_jogo }
                            </Text>
                        </TouchableOpacity>

                        <DateTimePicker
                            isVisible={this.state.isVisible}
                            onConfirm={this.handlePicker}
                            onCancel={this.hidePicker}
                            mode={'date'}
                        />
                    </FormRow>

                    <FormRow>
                        <TouchableOpacity onPress={this.showPickerTime1}>
                            <Text style={styles.labelfixed}>Hora início</Text>
                            <Text>
                                {partida.hora_inicio}
                            </Text>
                        </TouchableOpacity>

                        <DateTimePicker
                            isVisible={this.state.isVisibleTime1}
                            onConfirm={this.handlePickerTime1}
                            onCancel={this.hidePickerTime1}
                            mode={'time'}
                        />
                    </FormRow>

                    <FormRow>
                        <TouchableOpacity onPress={this.showPickerTime2}>
                            <Text style={styles.labelfixed}>Hora fim</Text>
                            <Text>
                                {partida.hora_fim}
                            </Text>
                        </TouchableOpacity>

                        <DateTimePicker
                            isVisible={this.state.isVisibleTime2}
                            onConfirm={this.handlePickerTime2}
                            onCancel={this.hidePickerTime2}
                            mode={'time'}
                        />
                    </FormRow>

                    <FormRow first>
                        <Text style={styles.labelfixed}>Valor dos gastos</Text>
                        <TextInput
                            style={styles.input}
                            value={partida.valor_gastos}
                            onChangeText={value => setFieldPartida('valor_gastos', value)}
                            placeholder='0,00'
                            keyboardType="numeric"
                            returnKeyType="go"
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
                                                setFieldPartida('endereco', value);
                                                handleTextChange(value);
                                            }}
                                            value={partida.endereco}
                                            returnKeyType='search'
                                        />
                                    </View>
                                    {isSearching && <ActivityIndicator size="large" />}
                                    <ScrollView>
                                        {locationResults.map(el => (
                                            <LocationItem
                                                {...el}
                                                key={el.id}
                                                isPartida
                                                fetchDetails={fetchDetails}
                                                inputValue={partida.endereco}
                                                onPress={() => {
                                                    inputValue = partida.endereco;
                                                    clearSearchs()
                                                }}
                                            />
                                        ))}
                                    </ScrollView>
                                </React.Fragment>
                            )}
                        </GoogleAutoComplete>
                    </FormRow>

                    { this.renderButton() }

                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelfixed: {
        color: '#778899',
    },
    input: {
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
    },
    tituloForm: {
        paddingTop: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

function mapStateToProps(state) {
    return {
        grupoSelected: state.grupoSelected,
        partida: state.partida
    }
}

const mapDispatchToProps = {
    setFieldPartida,
    savePartida,
}

export default connect(mapStateToProps, mapDispatchToProps)(JogoNovaPartida);