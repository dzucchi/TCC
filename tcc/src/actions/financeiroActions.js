import firebase from 'firebase';

export const SET_FIELD_JOGADOR_FINANCEIRO = 'SET_FIELD_JOGADOR_FINANCEIRO';
export const setFieldJogadorFinanceiro = (index, field, value) => {
    return {
        type: SET_FIELD_JOGADOR_FINANCEIRO,
        index,
        field,
        value,
    }
}

export const SET_JOGADORES_FINANCEIRO = 'SET_JOGADORES_FINANCEIRO';
const setJogadoresFinanceiro = jogadores => ({
    type: SET_JOGADORES_FINANCEIRO,
    jogadores
});

export const setJogadorFinanceiro = (index, value) => {
    return (dispatch, getState) => {
        const jogador = getState().jogadoresFinanceiro[index];
        const { id_user, id } = jogador;
        firebase
            .database()
            .ref(`/jogadores/${id_user}/${id}/financeiro/${getState().grupoSelected.id}`)
            .child('pago')
            .set(!value);
    }
}

export const getJogadoresFinanceiro = () => {
    return (dispatch, getState) => {

        if (getState().grupoSelected === null || getState().grupoSelected.jogadores === null) return;

        // PEGAR TODOS OS JOGADORES DO GRUPO SELECIONADO.
        firebase
            .database()
            .ref(`/jogadores`)
            .once('value', snapshot => {
                let jogadores = {}
                const jogadoresKeys = Object.keys(getState().grupoSelected.jogadores);
                const jogadoresKeysBaseON = Object.keys(snapshot.val());
                jogadoresKeysBaseON.forEach((keyON) => {
                    jogadoresKeys.forEach((key) => {
                        if (key === keyON) {
                            jogadores = [ ...jogadores, snapshot.val()[keyON]];
                        }
                    });
                });
                
                // PEGAR A CHAVE DE TODOS OS JOGADORES PRESENTES.
                let jogadoresPresentesKeys = [];
                firebase
                    .database()
                    .ref(`grupos/${getState().grupoSelected.id}/partidas`)
                    .once('value', snapshot => {
                        snapshot.forEach((partida) => {
                            if (partida.val().ativa) {
                                if (partida.val().jogadores_presentes) {
                                    const arrayJogadoresPresentes = Object.keys(partida.val().jogadores_presentes);
                                    arrayJogadoresPresentes.forEach((id_user_presente) => {
                                        if (partida.val().jogadores_presentes[id_user_presente]) {
                                            jogadoresPresentesKeys = [...jogadoresPresentesKeys, id_user_presente];
                                        }
                                    });
                                }
                            }
                        });
                    });
                
                // FAZER O DISPATCH DOS JOGADORES.
                let jogadoresFinanceiro = {};
                if (jogadoresPresentesKeys) {
                    jogadores.forEach(jogador => {
                        let jogadorFiltrado = jogador[Object.keys(jogador)[0]];
                        jogadorFiltrado.valor_pago = false;
                        jogadoresPresentesKeys.forEach((id_user_presente) => {
                            if (id_user_presente === jogadorFiltrado.id_user) {
                                jogadoresFinanceiro = [...jogadoresFinanceiro, jogadorFiltrado];
                            }
                        });
                    });
                }
                dispatch(setJogadoresFinanceiro(jogadoresFinanceiro));
            });
    }
}

export const contabilizarFinanceiro = () => {
    return (dispatch, getState) => {

        const jogadores = getState().jogadoresFinanceiro;
        jogadores.forEach((jogador) => {
            if (!jogador.valor_pago) {

                // VALOR RATEIO.
                let gastoPartida = 0;
                getState().partidas.forEach(element => {
                    if (element.ativa) {
                        gastoPartida = parseFloat(element.valor_gastos);
                    }
                });
                const qtdJogadores = getState().jogadoresFinanceiro.length;
                const valorRateio = gastoPartida / qtdJogadores;
                console.log('gastoPartida ', gastoPartida)
                console.log('qtdJogadores ', qtdJogadores)
                console.log('valorRateio ', valorRateio)

                // SUBTRAINDO DESPESAS.
                console.log('POHA ', getState().grupoSelected.id);
                let saldo_jogador = jogador.financeiro[getState().grupoSelected.id].valor;
                console.log('saldo_jogador ', saldo_jogador)
                if (!saldo_jogador || isNaN(saldo_jogador)) {
                    console.log('entro')
                    saldo_jogador = 0;
                }
                console.log('parseFloat(saldo_jogador) ', parseFloat(saldo_jogador))
                const saldo_final = (parseFloat(saldo_jogador) - valorRateio).toFixed(2);
                console.log('saldo_final ', saldo_final)

                const { id_user, id } = jogador;
                firebase
                    .database()
                    .ref(`/jogadores/${id_user}/${id}/financeiro`)
                    .child(getState().grupoSelected.id)
                    .update({
                        pago: false,
                        valor: saldo_final
                    });
            }
        });
    }
}