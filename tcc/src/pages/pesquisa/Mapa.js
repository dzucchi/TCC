import React from "react";

import { StyleSheet, View, Text, ActivityIndicator, TextInput, ScrollView } from "react-native";

import { connect } from "react-redux";

import { GoogleAutoComplete } from "react-native-google-autocomplete";

import LocationItem from "../../components/LocationItem";

import MapView, { Marker, Callout } from "react-native-maps";

import { getLocalizacoes, setSearchedGrupo } from "../../actions";

class Mapa extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            valor_pesquisa: '',
            latitude: null,
            longitude: null,
            places: null,
        }
    }

    componentWillMount() {
        this.props.getLocalizacoes().then(() => {
            this.getPlaces();
        });
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            }
        );
    }

    getPlaces() {
        const { localizacoes, navigation, setSearchedGrupo } = this.props;
        if (localizacoes.length > 1) {
            const arrayMarkers = [];
            localizacoes.forEach((element, i) => {
                arrayMarkers.push(
                    <Marker
                        key={element.id_grupo}
                        coordinate={{
                            latitude: element.latitude,
                            longitude: element.longitude
                        }}
                        onCalloutPress={() => {
                            setSearchedGrupo(element.id_grupo);
                            navigation.navigate('GrupoFutebolDetail', { id_grupo: element.id_grupo })
                        }}
                    >
                        <Callout>
                            <View style={{margin: 5}}>
                                <Text>{element.nome}</Text>
                                <Text>Futebol</Text>
                                <Text>{element.privado ? "Fechado" : "Aberto"}</Text>
                            </View>
                        </Callout>
                    </Marker>
                );
            });
            this.setState({places: arrayMarkers});
        }

        // const url = this.getUrlWithParameters(this.state.latitude, this.state.longitude, 500, 'AIzaSyCXjQR2IrF0tWKliRccy_CUkX-__qynY1Y');
        // fetch(url)
        //     .then((data) => data.json())
        //     .then((res) => {
        //     });
    }

    // getUrlWithParameters(lat, long, radius, API) {
    //     const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
    //     const location = `location=${lat},${long}&radius=${radius}`;
    //     const key = `&key=${API}`;
    //     return `${url}${location}${key}`
    // }

    render() {
        
        const { latitude, longitude } = this.state;
        const { localizacoes } = this.props;

        console.log('render: ', latitude, ' - ', longitude);

        if (latitude === null || longitude === null || localizacoes === null) {
            return <ActivityIndicator />;
        }

        return (
            <View style={styles.container}>
                
                <MapView
                    style={styles.map}
                    provider={MapView.PROVIDER_GOOGLE}
                    region={{
                        latitude,
                        longitude,
                        latitudeDelta: 0.0042,
                        longitudeDelta: 0.0041,
                    }}
                >

                {this.state.places}

                    {/* <MapView.Marker
                        coordinate={{
                            latitude: -8.7258686,
                            longitude: -35.0931849,
                        }}
                        title={'Meu ponto'}
                        description={'algum desc'}
                        identifier={'123'}
                        onPress={e => console.log(e.nativeEvent)}
                    /> */}
                </MapView>

                <View style={styles.campo_pesquisa}>
                    <GoogleAutoComplete 
                        apiKey="AIzaSyCXjQR2IrF0tWKliRccy_CUkX-__qynY1Y" 
                        debounce={500} 
                        minLength={3} 
                        query={{
                            key: "AIzaSyCXjQR2IrF0tWKliRccy_CUkX-__qynY1Y",
                            language: 'pt-br',
                        }}
                        currentLocation={true}
                        currentLocationLabel="Current location"
                        nearbyPlacesAPI='GooglePlacesSearch'
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
                                            this.setState({valor_pesquisa: value})
                                            handleTextChange(value);
                                        }}
                                        value={this.state.valor_pesquisa}
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
                                            inputValue={this.state.valor_pesquisa}
                                            isSearching
                                            onPress={async () => {
                                                const res = await fetchDetails(el.place_id);
                                                const { lat, lng } = res.geometry.location;
                                                this.setState({
                                                    latitude: lat,
                                                    longitude: lng,
                                                    valor_pesquisa: el.description,
                                                });
                                                inputValue = this.state.valor_pesquisa;
                                                clearSearchs();
                                            }}
                                        />
                                    ))}
                                </ScrollView>
                            </React.Fragment>
                        )}
                    </GoogleAutoComplete>
                </View>

                </View>
                
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        position: 'absolute',
        top: 30,
        left: 0,
        right: 0,
        bottom: 0,
    },
})

const mapDispatchToProps = {
    getLocalizacoes,
    setSearchedGrupo,
}

const mapStateToProps = state => {
    return {
        localizacoes: state.localizacoes,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Mapa);