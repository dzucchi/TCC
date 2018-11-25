import firebase from "firebase";

export const SET_NOTIFICACOES = 'SET_NOTIFICACOES';
const setNotificacoes = notificacoes => ({
    type: SET_NOTIFICACOES,
    notificacoes
});

export const watchNotificacoes = () => {
    return (dispatch, getState) => {

        firebase
            .database()
            .ref(`notificacoes/${getState().jogador.id_user}`)
            .on('value', snapshot => {
                let notificacoes = [];
                snapshot.forEach((notificacao) => {
                    if (notificacao.val().ativa) {
                        notificacoes = [ ...notificacoes, notificacao.val() ];
                    }
                });
                dispatch(setNotificacoes(notificacoes));
            });
    }
}

export const saveNotificacao = (id_lider_grupo, id_grupo, nome_grupo, id_jogador, uid_jogador, nome_jogador) => {
    return (dispatch, getState) => {

        const db = firebase.database();
        const ref = db.ref(`/notificacoes/${id_lider_grupo}`);
        const snap = ref.push();
        const key = snap.key;

        let notificacao = {};
        notificacao.id = key;
        notificacao.ativa = true;
        notificacao.id_lider_grupo = id_lider_grupo;
        notificacao.id_grupo = id_grupo;
        notificacao.nome_grupo = nome_grupo;
        notificacao.id_jogador = id_jogador;
        notificacao.uid_jogador = uid_jogador;
        notificacao.nome_jogador = nome_jogador;
        snap.ref.set(notificacao);
    }
}

export const setJogadorAoGrupo = (id_jogador, uid_jogador, id_grupo) => {
    return (dispatch, getState) => {
        firebase
            .database()
            .ref(`/jogadores/${id_jogador}/${uid_jogador}/grupos`)
            .update({[id_grupo]: true});

        firebase
            .database()
            .ref(`/grupos/${id_grupo}/jogadores`)
            .update({[id_jogador]: true});
    }
}

export const desativarNotificacao = (id_jogador, id_notificacao) => {
    return (dispatch, getState) => {
        console.log('DESATIVAR ', id_jogador, '  -  ', id_notificacao)
        const db = firebase.database();
        const ref = db.ref(`/notificacoes/${id_jogador}/${id_notificacao}/ativa`);
        ref.set(false);
    }
}