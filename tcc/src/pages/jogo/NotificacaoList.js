import React from "react";

import { StyleSheet, View, FlatList, Text } from "react-native";

import { connect } from "react-redux";

import NotificacaoItem from "../../components/NotificacaoItem";

class NotificacaoList extends React.Component {

    render() {
        const { notificacoes, navigation } = this.props;

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