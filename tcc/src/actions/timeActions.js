import firebase from 'firebase';

export const SET_FIELD_JOGADOR_DISPONIVEL = 'SET_FIELD_JOGADOR_DISPONIVEL';
export const setFieldJogadorDisponivel = (index, field, value) => {
    return {
        type: SET_FIELD_JOGADOR_DISPONIVEL,
        index,
        field,
        value,
    }
}

export const SET_JOGADORES_DISPONIVEIS = 'SET_JOGADORES_DISPONIVEIS';
const setJogadoresDisponiveis = jogadores => ({
    type: SET_JOGADORES_DISPONIVEIS,
    jogadores
});

export const getJogadoresDisponiveisTime = () => {
    return (dispatch, getState) => {

        // PEGAR A CHAVE DE TODOS OS JOGADORES PRESENTES.
        // PEGAR A KEY DA PARTIDA ATIVA.
        let partidaAtivaKey;
        let jogadoresPresentesKey = [];
        firebase
            .database()
            .ref(`grupos/${getState().grupoSelected.id}/partidas`)
            .once('value', snapshot => {
                snapshot.forEach((partida) => {
                    if (partida.val().ativa) {
                        partidaAtivaKey = partida.key;
                        jogadoresPartidaKeys = Object.keys(partida.val().jogadores_presentes);
                        jogadoresPartidaKeys.forEach((key) => {
                            if (partida.val().jogadores_presentes[key]) {
                                jogadoresPresentesKey = [ ...jogadoresPresentesKey, key ]
                            }
                        });
                    }
                });
            });

        // PEGAR OS JOGADORES QUE NÃO POSSUI TIME.
        let jogadoresSemTime = [];
        jogadoresPresentesKey.forEach((jogadorPresenteKey) => {
            let naoPossuiTime = true;
            firebase
                .database()
                .ref(`grupos/${getState().grupoSelected.id}/partidas/${partidaAtivaKey}/times`)
                .once('value', snapshot => {
                    snapshot.forEach((time) => {
                        const keysDosJogadoresTime = Object.keys(time.val().jogadores);
                        keysDosJogadoresTime.forEach((jogadorTimeKey) => {
                            if (jogadorTimeKey === jogadorPresenteKey) {
                                naoPossuiTime = false;
                            }
                        });
                    });
                });
            if (naoPossuiTime) {
                jogadoresSemTime = [ ...jogadoresSemTime, jogadorPresenteKey];
            }
        });

        // PEGAR TODOS OS JOGADORES DO GRUPO SELECIONADO.
        let jogadores = [];
        firebase
            .database()
            .ref(`/jogadores`)
            .once('value', snapshot => {
                const jogadoresKeys = Object.keys(getState().grupoSelected.jogadores);
                const jogadoresKeysBaseON = Object.keys(snapshot.val());
                jogadoresKeysBaseON.forEach((keyON) => {
                    jogadoresKeys.forEach((key) => {
                        if (key === keyON) {
                            jogadores = [ ...jogadores, snapshot.val()[keyON]];
                        }
                    });
                });

                // MONTAR ARRAY DE OBJ. JOGADORES.
                let filtro = [];
                if (jogadoresSemTime) {
                    jogadoresSemTime.forEach((idJogadorSemTime) => {
                        jogadores.forEach(jogador => {
                            let jogadorFiltrado = jogador[Object.keys(jogador)[0]];
                            if (jogadorFiltrado.id_user === idJogadorSemTime) {
                                jogadorFiltrado.jogador_escalado = false;
                                filtro = [...filtro, jogadorFiltrado];
                            }
                        });
                    });
                }
                dispatch(setJogadoresDisponiveis(filtro))
            });
    }
}

export const saveTime = time_nome => {
    return async (dispatch, getState) => {

        // PEGAR KEYS DOS JOGADORES SELECIONADOS PARA O TIME.
        let jogadoresTimeKey = [];
        getState().jogadoresDisponiveisTime.forEach((jogador) => {
            if (jogador.jogador_escalado) {
                jogadoresTimeKey = [ ...jogadoresTimeKey, jogador.id_user ];
            }
        });
        
        // PEGAR A KEY DA PARTIDA ATIVA.
        let partidaAtivaKey;
        firebase
            .database()
            .ref(`grupos/${getState().grupoSelected.id}/partidas`)
            .once('value', snapshot => {
                snapshot.forEach((partida) => {
                    if (partida.val().ativa) {
                        partidaAtivaKey = partida.key;
                    }
                });
            });

        // INSERIR O TIME.
        const idSeletedGrupo = getState().grupoSelected.id;
        const db = firebase.database();
        const ref = db.ref(`/grupos/${idSeletedGrupo}/partidas/${partidaAtivaKey}/times`);
        const snap = ref.push();
        const key = snap.key;
        let time = {};
        time.nome = time_nome;
        time.id = key;
        await snap.ref.set(time);

        // INSERIR OS JOGADORES NO TIME.
        jogadoresTimeKey.forEach((jogadorKey) => {
            let obj = {};
            obj[jogadorKey] = true;
            ref
                .child(`${time.id}`)
                .child('jogadores')
                .update(obj);
        });
    }
}

export const SET_TIMES = 'SET_TIMES';
const setTimes = times => ({
    type: SET_TIMES,
    times
});

export const getTimes = () => {
    return async (dispatch, getState) => {
        
        // PEGAR A KEY DA PARTIDA ATIVA.
        let partidaAtivaKey;
        firebase
            .database()
            .ref(`grupos/${getState().grupoSelected.id}/partidas`)
            .once('value', snapshot => {
                snapshot.forEach((partida) => {
                    if (partida.val().ativa) {
                        partidaAtivaKey = partida.key;
                    }
                });
            });

        // LISTAR TODOS OS TIMES.
        firebase
            .database()
            .ref(`grupos/${getState().grupoSelected.id}/partidas/${partidaAtivaKey}/times`)
            .on('value', async snapshot => {
                let times = [];
                snapshot.forEach((time) => {
                    times = [ ...times, time.val() ];
                });
                await dispatch(setTimes(times));
            });
    }
}