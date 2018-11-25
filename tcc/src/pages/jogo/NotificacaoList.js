import React from "react";

import { StyleSheet, View, FlatList, Text } from "react-native";

import { connect } from "react-redux";

import NotificacaoItem from "../../components/NotificacaoItem";

class NotificacaoList extends React.Component {

    render() {
        const { notificacoes, navigation } = this.props;

        if (notificacoes.length === 0) {
            return (
                <View style={styles.container}>
                    <Text>Sem notificações</Text>
                </View>
            );
        }

        return (
            <View>
                <FlatList
                    data={notificacoes}
                    renderItem={({ item, index }) => (
                        <NotificacaoItem 
                            notificacao={item} 
                            navigation={navigation} />
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
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

const mapDispatchToProps = {
}

const mapStateToProps = state => {
    return {
        notificacoes: state.notificacoes,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificacaoList);