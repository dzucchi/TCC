import firebase from "firebase";

export const SET_LOCALIZACOES = 'SET_LOCALIZACOES';
const setLocalizacoes = localizacoes => ({
    type: SET_LOCALIZACOES,
    localizacoes
});

export const getLocalizacoes = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {

            let localizacoes = [];
            firebase
                .database()
                .ref(`grupos`)
                .on('value', snapshot => {
                    snapshot.forEach((grupo) => {
                        if (grupo.val().localizacao) {
                            let localizacao = {};
                            localizacao.latitude = grupo.val().localizacao.lat;
                            localizacao.longitude = grupo.val().localizacao.lng;
                            localizacao.id_grupo = grupo.val().id;
                            localizacao.privado = grupo.val().privado;
                            localizacao.nome = grupo.val().nome;
                            localizacoes = [ ...localizacoes, localizacao ];
                        }
                    });
                });
            dispatch(setLocalizacoes(localizacoes));
            resolve();
        });
    }
}