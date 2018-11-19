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

        return (
            <View>
                <FlatList
                    data={partidas}
                    renderItem={({ item }) => (
                        <PartidaItem 
                            partida={item} />
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