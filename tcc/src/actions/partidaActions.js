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

export const savePartida = partida => {
    return async (dispatch, getState) => {
        const db = firebase.database();
        const snap = db.ref(`/grupos/${getState().grupoSelected.id}/partidas`).push();
        const key = snap.key;
        partida.id = key;
        await snap.ref.set(partida);
        
        dispatch(partidaSaveSuccess());  
    }
};