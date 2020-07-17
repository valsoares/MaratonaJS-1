import {setAccount, setToken, setRefreshToken} from '../services/account';
import {CREATE, DELETE, EDIT, LIST, GET, LINK_DELETE} from '../actions/LinkActions';

const initialState = {
    link: null,
    links: []
};

export default function(state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case CREATE: {
            const response = payload ? payload.data : null;
            const link = response ? response.data : null;

            return {...state, link };
        }
        case LIST: {
            const responses = payload ? payload.data : null;
            const links = responses ? responses.data : null;

            return {...state, links };
        }
        case GET: {
            const response = payload ? payload.data : null;
            const link = response ? response.data : null;

            return {...state, link };
        }
        case EDIT: {
            const response = payload ? payload.data : null;
            const link = response ? response.data : null;

            return {...state, link };
        }
        case LINK_DELETE: {
            return{...state, linkDelete: payload};
        }
        case DELETE: {
            const links = state.links.filter(link=> link.id !== state.linkDelete.id);
            return{...state, linkDelete: null, links};
        }
        default:
            return state;
    }
};