import firebase from "firebase";

export const SET_SELECTED_GRUPO = 'SET_SELECTED_GRUPO';
export const setSelectedGrupo = grupo => ({
    type: SET_SELECTED_GRUPO,
    grupo,
});

export const watchSelectedGrupo = () => {
    return (dispatch, getState) => {
        if (getState().grupoSelected) {
            firebase
                .database()
                .ref(`/grupos`)
                .on('value', snapshot => {
                    if (snapshot.val() !== null) {
                        const grupoKeysBaseON = Object.keys(snapshot.val());
                        grupoKeysBaseON.forEach(function(keyON) {
                            if (keyON === getState().grupoSelected.id) {
                                dispatch(setSelectedGrupo(snapshot.val()[keyON]));
                            }
                        });
                    }
                });
        }
    }
}