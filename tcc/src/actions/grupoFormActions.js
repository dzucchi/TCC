import firebase from 'firebase';

export const SET_FIELD_GRUPO = 'SET_FIELD_GRUPO';
export const setFieldGrupo = (field, value) => {
    return {
        type: SET_FIELD_GRUPO,
        field,
        value,
    }
}

export const SET_WHOLE_GRUPO = 'SET_WHOLE_GRUPO';
export const setWholeGrupo = grupo => ({
    type: SET_WHOLE_GRUPO,
    grupo
});

export const GRUPO_SAVED_SUCCESS = 'GRUPO_SAVED_SUCCESS';
const grupoSaveSuccess = () => ({
    type: GRUPO_SAVED_SUCCESS
});

export const RESET_FORM = 'RESET_FORM';
export const resetForm = () => ({
    type: RESET_FORM
});

export const saveGrupo = grupo => {
    const { currentUser } = firebase.auth();
    return async (dispatch, getState) => {
        const db = firebase.database();
        if (grupo.id) {
            await db.ref(`/grupos/${grupo.id}`).set(grupo);    
        } else {
            grupo.id_lider = currentUser.uid;
            grupo.jogadores[currentUser.uid] = true;
            const snap = await db.ref(`/grupos`).push(grupo);
            const keyGrupoInserido = snap.key;

            const { grupos } = getState().jogador;
            grupos[keyGrupoInserido] = true;

            await db
                .ref(`/jogadores/${currentUser.uid}/${getState().jogador.id}/`)
                .child('grupos')
                .set(grupos);
        } 
        dispatch(grupoSaveSuccess())   
    }
}