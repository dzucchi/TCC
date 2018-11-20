import React from "react";

import { 
    StyleSheet, 
    View, 
    FlatList, 
    Button, 
    ActivityIndicator, 
    Text, 
    Alert 
} from "react-native";

import { connect } from "react-redux";

import { NavigationEvents } from "react-navigation";

import PartidaItem from "../../components/PartidaItem";

import { getPartidas } from "../../actions";

class Historico extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        }
    }

    componentDidMount() {
        this.props.getPartidas();
    }

    render() {
        const { partidas } = this.props;

        if (partidas === null) {
            return <ActivityIndicator />;
        }

        let resultados = [];
        if (partidas.length > 1) {
            Object.values(partidas).forEach((partida) => {
                if (partida.resultados) {
                    Object.values(partida.resultados).forEach((resultado) => {
                        resultados = [ ...resultados, resultado ];
                    });
                }
            });
        } else {
            return (
                <View style={styles.container_sem_partida}>
                    <NavigationEvents
                        onWillFocus={() => {
                            this.props.getPartidas();
                        }}
                    />
                    <Text style={{fontSize: 30}}>Não há partidas</Text>
                </View>
            );
        }

        return (
            <View>
                <NavigationEvents
                    onWillFocus={async () => {
                        await this.props.getPartidas();
                    }}
                />
                <FlatList
                    data={resultados}
                    renderItem={({ item }) => (
                        <PartidaItem 
                            resultado={item}/>
                    )}
                    keyExtractor={(item, id) => id.toString()}
                    ListHeaderComponent={props => (<View style={styles.marginTop} />)}
                    ListFooterComponent={props => (<View style={styles.marginBottom} />)}
                />               
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
    container_sem_partida: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

const mapDispatchToProps = {
    getPartidas,
}

const mapStateToProps = state => {
    return {
        partidas: state.partidas,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Historico);