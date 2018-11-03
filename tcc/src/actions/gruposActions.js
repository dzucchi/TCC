import firebase from "firebase";

export const SET_GRUPOS = 'SET_GRUPOS';
const setGrupos = grupos => ({
    type: SET_GRUPOS,
    grupos,
});

export const watchGrupos = () => {   
    return (dispatch, getState) => {
        const grupoKeys = Object.keys(getState().jogador.grupos);
        let promises = grupoKeys.map(key => {
            return new Promise(function(resolve, reject) {
                firebase
                    .database()
                    .ref(`/grupos/${key}`)
                    .on('value', snapshot => {
                        const grupo = snapshot.val();
                        return resolve({...grupo, id:key});
                    });
            });
        });
        Promise.all(promises).then((grupo) => {
            const action = setGrupos(grupo);
            dispatch(action);
        });
    }
}

