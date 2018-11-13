import firebase from 'firebase';

export const SET_FIELD_PARTIDA = 'SET_FIELD_PARTIDA';
export const setFieldPartida = (field, value) => {
    return {
        type: SET_FIELD_PARTIDA,
        field,
        value,
    }
}

export const PARTIDA_SAVED_SUCCESS = 'PARTIDA_SAVED_SUCCESS';
const partidaSaveSuccess = () => ({
    type: PARTIDA_SAVED_SUCCESS
});

export const SET_JOGADORES_FROM_SELECTED_GRUPO = 'SET_JOGADORES_FROM_SELECTED_GRUPO';
const setJogadoresFromSelectedGrupo = jogadores => ({
    type: SET_JOGADORES_FROM_SELECTED_GRUPO,
    jogadores
});

export const watchJogadoresFromSelectedGrupo = () => {
    return (dispatch, getState) => {
        firebase
            .database()
            .ref(`/jogadores`)
            .on('value', snapshot => {
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
                

                let jogadoresPresentesKeys;

                firebase
                    .database()
                    .ref(`grupos/${getState().grupoSelected.id}/partidas`)
                    .once('value', snapshot => {
                        snapshot.forEach((partida) => {
                            if (partida.val().ativa) {
                                if (partida.val().jogadores_presentes) {
                                    jogadoresPresentesKeys = Object.keys(partida.val().jogadores_presentes);
                                }
                            }
                        });
                    });

                let filtro = {};
                jogadores.forEach(jogador => {
                    let jogadorFiltrado = jogador[Object.keys(jogador)[0]];
                    jogadorFiltrado.presenca_confirmada = false;
                    jogadoresPresentesKeys.forEach((id_user_presente) => {
                        if (id_user_presente === jogadorFiltrado.id_user) {
                            jogadorFiltrado.presenca_confirmada = true;
                        }
                    });
                    filtro = [...filtro, jogadorFiltrado];
                });

                dispatch(setJogadoresFromSelectedGrupo(filtro));
            });
    }
}

export const presenceUpdate = () => {
    return (dispatch, getState) => {
        try {
            firebase
                .database()
                .ref(`grupos/${getState().grupoSelected.id}/partidas`)
                .once('value', snapshot => {
                    snapshot.forEach((partida) => {
                        if (partida.val().ativa) {
                            if (partida.val().jogadores_presentes) {
                                jogadoresPresentesKeys = Object.keys(partida.val().jogadores_presentes);
                            }
                        }
                    });
                });
        } catch(error) {
            console.error(error);
        }
    }
}

export const savePartida = partida => {
    return async (dispatch, getState) => {
        const idSeletedGrupo = getState().grupoSelected.id;

        const db = firebase.database();
        const snap = db.ref(`/grupos/${idSeletedGrupo}/partidas`).push();
        const key = snap.key;
        partida.id = key;
        await snap.ref.set(partida);

        firebase
            .database()
            .ref(`/grupos/${idSeletedGrupo}`)
            .child('estagio')
            .set(1);

        dispatch(partidaSaveSuccess());  
    }
};