import firebase from "firebase";

export const watchGrupos = () => {
    const { currentUser } = firebase.auth();
    return (dispatch, getState) => {
        firebase
            .database()
            .ref(`/jogadores/${currentUser.uid}`)
            .on('value', snapshot => {
                const jogador = snapshot.val();
            });
    }
}