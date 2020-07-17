import {setAccount, setToken, setRefreshToken, removeAccount, removeToken, removeRefreshToken, getAccount} from '../services/account';
import {SIGN_IN, SIGN_UP, LOG_OUT, INIT, REFRESH_TOKEN} from '../actions/AccountActions';

const initialState = {
    account: '',
    message: ''
};

export default function(state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case SIGN_UP:
        case SIGN_IN:
            const response = payload ? payload.data : null;
            const account = response ? response.data : null;
            const message = payload.response ? payload.response.data.message : null ;
            
            const metadata = response ? response.metadata : null;
            const token = metadata ? metadata.token : null;
            const refreshToken = metadata ? metadata.refreshToken : null;

            if(account) setAccount(account);
            if(token) setToken(token);
            if(refreshToken) setRefreshToken(refreshToken);

            return {...state, account: account, message: message};
        case LOG_OUT:
            removeAccount();
            removeToken();
            removeRefreshToken();
            return {...state, account: null};
        case INIT:
            const account_init = getAccount();
            return {...state, account: account_init};
        case REFRESH_TOKEN: {
            const response = payload ? payload.data : null;
            const metadata = response ? response.metadata : null;
            const token = metadata ? metadata.token : null;

            if(token) setToken(token);

            return state;
        }

        default:
            return state;

    }
};