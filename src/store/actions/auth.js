import * as actionTypes from './actions';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFailure = (error) => {
    return {
        type: actionTypes.AUTH_FAILURE,
        error: error
    }
}

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeOut = (expiresIn) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logOut())
        }, expiresIn * 1000)
    }
}

export const auth = (email, password, method) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            email : email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=';
        if(method === 'SignIn'){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=';

        }
        axios.post(url+'AIzaSyAx7qg82BHSLnu84bu05lpHoftxCyKy-S0', authData)
        .then(response => {
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('expirationTime', expirationDate)
            localStorage.setItem('userId', response.data.localId)
            dispatch(authSuccess(response.data.idToken, response.data.localId ))
            dispatch(checkAuthTimeOut(response.data.expiresIn))
        })
        .catch(err => {
            console.log(err);
            dispatch(authFailure(err.response.data.error));
        })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const checkAuthState = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');

        if(!token){
            dispatch(logOut());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationTime'));
            const userId = localStorage.getItem('userId')
            if(expirationDate > new Date()){
                 dispatch(authSuccess(token, userId))
                 dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000 ))
            } else {
                console.log('logging out')
                dispatch(logOut())
            }
           
        }

    }
}
