import firebase from "firebase";

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
const userLoginSuccess = user => ({
    type: USER_LOGIN_SUCCESS,
    user
});

export const USER_LOGOUT = 'USER_LOGOUT';
const userLogout = () => ({
    type: USER_LOGOUT
});

export const tryLoginWithFacebook = ({ type, token }) => dispatch => {
    if (type === 'success') {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        return firebase
            .auth()
            .signInAndRetrieveDataWithCredential(credential)
            .then(user => {
                dispatch(userLoginSuccess(user))
                return user;
            })
            .catch((error) => {
                return Promise.reject(error);
            })
    }
}

export const createAccount = ({ email, password }) => dispatch => {
    return firebase
            .auth()
            .createUserWithEmailAndPassword(email.trim(), password)
            .then(user => {
                dispatch(userLoginSuccess(user));    
                return user;
            })
            .catch(error => {
                return Promise.reject(error);
            });
}

export const tryLogin = ({ email, password }) => dispatch => {
    return firebase
        .auth()
        .signInWithEmailAndPassword(email.trim(), password)
        .then(user => {
            dispatch(userLoginSuccess(user));
            return user;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}