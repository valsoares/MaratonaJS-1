import {apiPost, apiRefreshToken} from '../services/api';

export const INIT = 'INIT';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const LOG_OUT = 'LOG_OUT';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';

export const initAccount = () => {
    return {type: INIT, payload:{}};
}

export const signIn = (data) => {
    const payload = apiPost('/singin', data);
    return {type: SIGN_IN, payload};
};

export const signUp = (data) => {
    const payload = apiPost('/singup', data);
    return {type: SIGN_UP, payload};
};

export const logOut = () => {
    return {type: LOG_OUT, payload:{}};
};

export const getFreshToken = (refreshToken) => {
    const payload = apiRefreshToken();
    return {type:REFRESH_TOKEN, payload};
};