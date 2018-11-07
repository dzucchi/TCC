import firebase from "firebase";

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
                const grupoKeys = Object.keys(getState().jogador.grupos);
                let grupos = {}
                const grupoKeysBaseON = Object.keys(snapshot.val());
                grupoKeysBaseON.forEach(function(keyON) {                 
                    grupoKeys.forEach(function(key) {
                        if (key === keyON) {
                            grupos = [...grupos, snapshot.val()[keyON]]
                        }
                    })
                })
                dispatch(setGrupos(grupos))
            });
    }
}

