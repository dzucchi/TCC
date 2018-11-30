import firebase from "firebase";

import { setSelectedGrupo } from "./grupoSelectedActions";

export const SET_GRUPOS = 'SET_GRUPOS';
const setGrupos = grupos => ({
    type: SET_GRUPOS,
    grupos,
});

export const watchGrupos = () => {
    return (dispatch, getState) => {
        firebase
            .database()
            .ref(`/grupos`)
            .on('value', snapshot => {
                if (snapshot.val() !== null) {
                    let grupos = [];
                    if (getState().jogador.grupos) {
                        const grupoKeys = Object.keys(getState().jogador.grupos);
                        const grupoKeysBaseON = Object.keys(snapshot.val());
                        grupoKeysBaseON.forEach(function(keyON) {
                            grupoKeys.forEach(function(key) {
                                if (key === keyON) {
                                    grupos = [...grupos, snapshot.val()[keyON]];
                                }
                            });
                        });
                        if (getState().grupoSelected) {
                            grupoKeysBaseON.forEach(function(keyON) {
                                if (getState().grupoSelected.id === keyON) {
                                    dispatch(setSelectedGrupo(snapshot.val()[keyON]));
                                }
                            });
                        }
                    }
                    dispatch(setGrupos(grupos));
                }
            });
    }
}