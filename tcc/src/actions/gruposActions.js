import firebase from "firebase";

export const SET_GRUPOS = 'SET_GRUPOS';
const setGrupos = grupo => ({
    type: SET_GRUPOS,
    grupo,
});

export const watchGrupos = () => {
    return (dispatch, getState) => {
        const grupoKeys = Object.keys(getState().jogador.grupos);
        grupoKeys.map(id => {
            firebase
                .database()
                .ref(`/grupos/${id}`)
                .on('value', snapshot => {
                    const grupo = snapshot.val();
                    const action = setGrupos({...grupo, id});
                    dispatch(action);
                    // Precisa ter delay pra cada inserção....
                });
        });
    }
}