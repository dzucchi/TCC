import React from "react";
import { ScrollView, StyleSheet, View, Text, Button } from "react-native";
import { connect } from "react-redux";
import { watchJogador } from "../../actions";

import Line from "../../components/Line";

class FutebolPerfil extends React.Component {
    componentDidMount() {
        this.props.watchJogador();
    }

    render() {
        const { jogador, navigation } = this.props;

        return (
            <ScrollView>

                <View style={styles.container}>
                    <Text style={styles.nome}>{jogador.nome}</Text>
                    <Text style={styles.idade}>{jogador.idade} anos</Text>
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
                        onPress={() => {
                            navigation.replace('FutebolPerfilForm');
                        }} />
                </View>

                <View style={{height: 30, backgroundColor: 'steelblue'}} />


            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        margin: 10
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
    endereco: {
        
    },
    contentbaixo: {
        marginTop: 20,
        marginRight: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
    }
});

const mapDispatchToProps = {
    watchJogador
}

const mapStateToProps = state => {
    return {
        jogador: state.jogador
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FutebolPerfil);