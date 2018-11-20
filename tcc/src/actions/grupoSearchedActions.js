import firebase from "firebase";

export const SET_SEARCHED_GRUPO = 'SET_SEARCHED_GRUPO';
const setSearchedGrupoReducer = grupo => ({
    type: SET_SEARCHED_GRUPO,
    grupo
});

export const setSearchedGrupo = id_grupo => {
    return (dispatch, getState) => {
        firebase
            .database()
            .ref(`grupos/${id_grupo}`)
            .on('value', snapshot => {
                dispatch(setSearchedGrupoReducer(snapshot.val()));
            });
    }
}