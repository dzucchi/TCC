import React from "react";

import { StyleSheet, View, FlatList, Button, ActivityIndicator, Text, Alert } from "react-native";

import { connect } from "react-redux";

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
                        <Text>{item.nome}</Text>
                    )}
                    keyExtractor={(item, id) => id.toString()}
                    ListHeaderComponent={props => (<View style={styles.marginTop} />)}
                    ListFooterComponent={props => (<View style={styles.marginBottom} />)}
                />

                { this.renderCriarTimeButton() }
                
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