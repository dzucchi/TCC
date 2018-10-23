import firebase from "firebase";

export const SET_FIELD = 'SET_FIELD';
export const setField = (field, value) => {
    return {
        type: SET_FIELD,
        field,
        value,
    }
}

export const SET_FIELD_SEGUNDO_NIVEL = 'SET_FIELD_SEGUNDO_NIVEL';
export const setFieldSegundoNivel = (field, field2, value) => {
    return {
        type: SET_FIELD_SEGUNDO_NIVEL,
        field,
        field2,
        value,
    }
}

export const SET_JOGADOR = 'SET_JOGADOR';
export const setJogador = jogador => ({
    type: SET_JOGADOR,
    jogador,
});

export const inserirJogador = jogador => {
    const { currentUser } = firebase.auth();
    const db = firebase.database();
    const id = db
        .ref(`/jogadores/${currentUser.uid}`)
        .push(jogador)
        .key;
    db
    .ref(`/jogadores/${currentUser.uid}/${id}`)
    .set({...jogador, id});
    return id;
}

export const alterarJogador = jogador => {
    const { currentUser } = firebase.auth();
    return async () => {
        await firebase
            .database()
            .ref(`/jogadores/${currentUser.uid}/${jogador.id}`)
            .set(jogador);
    } 
}

export const watchJogador = () => {
    const { currentUser } = firebase.auth();
    return (dispatch, getState) => {
        firebase
            .database()
            .ref(`/jogadores/${currentUser.uid}`)
            .on('value', snapshot => {
                const jogador = snapshot.val();
                if (jogador) {
                    const keys = Object.keys(jogador);
                    const action = setJogador(jogador[keys[0]]);
                    dispatch(action);
                } else {
                    const id = inserirJogador(getState().jogador);
                    const action = setJogador({...INITIAL_STATE, id});
                    dispatch(action);
                }
            });
    }
}

export const INITIAL_STATE = {
    nome: 'nome',
    idade: 'idade',
    comprometimento: 100,
    estado: 'estado',
    cidade: 'cidade',
    futebol: {
        direcao_chute: 'Destro',
        posicao: 'atacante'
    }
}