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

export const OUT_JOGADOR = 'OUT_JOGADOR';
export const outJogador = () => ({
    type: OUT_JOGADOR,
});

export const SET_JOGADOR = 'SET_JOGADOR';
export const setJogador = jogador => ({
    type: SET_JOGADOR,
    jogador,
});

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
        return new Promise((resolve, reject) => {
            firebase
                .database()
                .ref(`/jogadores/${currentUser.uid}`)
                .on('value', async snapshot => {
                    const jogador = snapshot.val();
                    if (jogador) {
                        const keys = Object.keys(jogador);
                        const action = setJogador(jogador[keys[0]]);
                        dispatch(action);
                        resolve();
                    } else {
                        let novoJogador = { ...INITIAL_STATE };

                        //Obtendo a ref.
                        const db = firebase.database();
                        const snap = db.ref(`/jogadores/${currentUser.uid}`).push();

                        // Setando id, id_user e nome.
                        novoJogador['id'] = snap.key;
                        novoJogador['id_user'] = currentUser.uid;

                        const { user } = getState().user;
                        if (user.email === null) {
                            novoJogador['nome'] = user.displayName;
                        } else {
                            novoJogador['nome'] = user.email;
                        }

                        // Insendo no firebase.
                        await snap.ref.set(novoJogador);

                        // enviando para o reducer de Jogador.
                        const action = setJogador(novoJogador);
                        dispatch(action);
                        resolve();
                    }
                    reject();
                });
            })
    }
}

export const INITIAL_STATE = {
    id: null,
    id_user: null,
    nome: '',
    idade: '',
    comprometimento: 100,
    estado: '',
    cidade: '',
    futebol: {
        direcao_chute: 'Ambidestro',
        posicao: 'Goleiro'
    },
    grupos: {}
}