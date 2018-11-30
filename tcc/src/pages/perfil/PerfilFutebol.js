import React from "react";

import { ScrollView, StyleSheet, View, Text, Button, ActivityIndicator, FlatList } from "react-native";

import { connect } from "react-redux";

import { AgeFromDateString } from "age-calculator";

import { 
    watchJogador,
    watchGrupos,
    watchNotificacoes,
    watchJogadoresFromSelectedGrupo,
    setField,
    setSelectedGrupo,
    userLogout,
    outJogador,
} from "../../actions";

import AddGrupoItem from "../../components/AddGrupoItem";

import NotificacaoIcon from "../../components/NotificacaoIcon";

import GrupoItem from "../../components/GrupoItem";

class PerfilFutebol extends React.Component {
    componentDidMount() {
        this.props.watchJogador().then(() => {
            this.props.watchGrupos();
            this.props.watchNotificacoes();
        });
    }

    formatarData(data) {
        const parts = data.split('/');
        const mydate = new Date(parts[2], parts[1] - 1, parts[0]);
        const idade = new AgeFromDateString(mydate).age;
        return idade;
    }

    getName() {
        const { user, jogador } = this.props.user;
        const { setField } = this.props;
        if (jogador.nome === '') {
            if (user.email === null) {
                setField('nome', user.displayName);
            }
            setField('nome', user.email);
        }
    }

    listarGrupos(grupos, navigation) {
        const { setSelectedGrupo, watchJogadoresFromSelectedGrupo } = this.props;
        
        return (
            <View>
                <FlatList
                    data={[...grupos, { isLast: true }]}
                    renderItem={({ item }) => (
                        item.isLast 
                            ? <AddGrupoItem 
                                onPress={() => navigation.navigate('GrupoForm')} />
                            : <GrupoItem
                                grupo={item}
                                onPress={async () => {
                                    await setSelectedGrupo(item);
                                    await watchJogadoresFromSelectedGrupo(item);
                                    navigation.navigate('Jogo');
                                }} />
                    )}
                    keyExtractor={(item, id) => id.toString()}
                    ListHeaderComponent={props => (<View style={styles.marginTop} />)}
                    ListFooterComponent={props => (<View style={styles.marginBottom} />)}
                />
            </View>
        );
    }

    renderButtons() {
        return (
            <View>
                <View style={{marginLeft: 10, marginRight: 10, marginTop: 10}}>
                    <Button 
                        title="Editar" 
                        onPress={() => this.props.navigation.navigate('PerfilFutebolForm')} />
                </View>
                <View style={styles.button}>
                    <Button
                        title='Sair'
                        color= 'red'
                        onPress={() => {
                            this.props.userLogout();
                            this.props.outJogador();
                            this.props.navigation.replace('Login');
                        }} />
                </View>
            </View>
        );
    }

    render() {
        const { jogador, grupos, notificacoes, navigation } = this.props;
        
        if (jogador === null || notificacoes === null) {
            return <ActivityIndicator />;
        }

        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.conteiner_nome}>
                        <Text style={styles.nome}>
                            {jogador.nome}
                        </Text>
                        <NotificacaoIcon 
                                qtdNotificacoes={notificacoes.length}
                                onPress={() => navigation.navigate('NotificacaoList')} />
                    </View>
                    <Text style={styles.idade}>
                        {jogador.idade === '' ? '' : this.formatarData(jogador.idade) + ' anos'}
                    </Text>
                    
                    <View style={styles.contentbaixo}>
                        <View  style={styles.endereco}>
                            <Text>{jogador.estado}</Text>
                            <Text>{jogador.cidade}</Text>
                        </View>
                        <View>
                            <Text>{jogador.futebol.posicao}</Text>
                            <Text>{jogador.futebol.direcao_chute}</Text>
                        </View>
                    </View>
                </View>

                {this.renderButtons()}

                <View style={styles.labelGrupos}>
                    <Text>
                        Grupos 
                    </Text>
                    <View style={{backgroundColor: 'gray', flex: 1, height: 1, marginLeft: 10}} />
                </View>

                {this.listarGrupos(grupos, navigation)}

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    labelGrupos: {
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        margin: 10,
        marginBottom: 25,
    },
    container: {
        marginTop: 20,
        marginLeft: 10,
    },
    nome: {
        fontSize: 30
    },
    idade: {
        marginTop: 10,
    },
    conteiner_nome: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    contentbaixo: {
        marginTop: 20,
        marginRight: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    barraGrupos: { 
        backgroundColor: '#006dcc', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    marginTop: {
        marginTop: 5,
    },
    marginBottom: {
        marginBottom: 5,
    },
});

const mapDispatchToProps = {
    watchJogador,
    watchGrupos,
    watchNotificacoes,
    watchJogadoresFromSelectedGrupo,
    setField,
    setSelectedGrupo,
    userLogout,
    outJogador,

}

const mapStateToProps = state => {
    return {
        jogador: state.jogador,
        user: state.user,
        grupos: state.grupos,
        notificacoes: state.notificacoes,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PerfilFutebol);