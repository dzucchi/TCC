import React from "react";
import { ScrollView, StyleSheet, View, Text, Button, ActivityIndicator, FlatList } from "react-native";
import { connect } from "react-redux";
import { watchJogador, watchGrupos, setField } from "../../actions";

import { AgeFromDateString } from "age-calculator";

import AddGrupoItem from "../../components/AddGrupoItem";
import GrupoItem from "../../components/GrupoItem";

const isEven = number => number % 2 === 0;

class FutebolPerfilDetail extends React.Component {
    componentDidMount() {
        this.props.watchJogador().then(() => {
            this.props.watchGrupos();
        });
    }

    formatarData(data) {
        const parts = data.split('/');
        const mydate = new Date(parts[2], parts[1] - 1, parts[0]);
        const idade = new AgeFromDateString(mydate).age;
        return idade;
    }

    getName() {
        const { user } = this.props.user;
        const { setField } = this.props;
        if (user.email === null) {
            setField('nome', user.displayName);
            return user.displayName;
        }
        setField('nome', user.email);
        return user.email;
    }

    render() {
        const { jogador, grupos, navigation } = this.props;

        if (jogador === null) {
            return <ActivityIndicator />;
        }

        return (
            
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.nome}>
                        {jogador.nome === '' ? this.getName() : jogador.nome}
                    </Text>
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
                
                <View style={styles.button}>
                    <Button 
                        title="Editar" 
                        onPress={() => navigation.navigate('FutebolPerfilForm')} />
                </View>

                <View style={styles.barraGrupos}>
                    <Text style={styles.labelGrupos}> Grupos </Text>
                </View>
                
                <View>
                    {console.log('@@@: ',...grupos)}
                    <FlatList
                        data={[...grupos, { isLast: true }]}
                        renderItem={({ item, index }) => (
                            item.isLast
                                ? <AddGrupoItem
                                    isFirstColumn={isEven(index)} 
                                />
                                : <GrupoItem
                                    serie={item}
                                    isFirstColumn={isEven(index)}
                                    
                                />
                        )}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={props => (<View style={styles.marginTop} />)}
                        ListFooterComponent={props => (<View style={styles.marginBottom} />)}
                    />
                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
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
    labelGrupos: {
        color: 'white',
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
    setField
}

const mapStateToProps = state => {
    return {
        jogador: state.jogador,
        user: state.user,
        grupos: state.grupos,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FutebolPerfilDetail);