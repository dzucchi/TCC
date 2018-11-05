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

const inserirGrupoNoJogador = (idGrupo) => {

    let myObj = {}
    myObj[idGrupo] = true;

    console.log('OBJBJBJ, ', myObj)

    const { currentUser } = firebase.auth();
    console.log('oi2');
    return async (dispatch, getState) => {
        console.log('oi3')
        console.log(`/jogadores/${currentUser.uid}/${getState().jogador.id}/grupos`)
        const db = firebase.database();
        await db
        .ref(`/jogadores/${currentUser.uid}/${getState().jogador.id}/grupos`)
        .set(myObj);
    }
}

export const saveGrupo = grupo => {
    const { currentUser } = firebase.auth();
    return async (dispatch, getState) => {
        const db = firebase.database();
        if (grupo.id) {
            await db.ref(`/grupos/${grupo.id}`).set(grupo);    
        } else {
            grupo.id_lider = currentUser.uid;
            const snap = await db.ref(`/grupos`).push(grupo);

            let myObj = {}
            myObj[snap.key] = true;

            // let grupos = [{}];
            // await db
            //     .ref(`/jogadores/${currentUser.uid}/${getState().jogador.id}/grupos`)
            //     .on('value', snapshot => {
            //         grupos = snapshot.val();
            //     });
            await db
                .ref(`/jogadores/${currentUser.uid}/${getState().jogador.id}/grupos`)
                .child(snap.key)
                .setValue(true);
        } 
        dispatch(grupoSaveSuccess())   
    }
}