import {apiPost, apiGet, apiPut, apiDel} from '../services/api';

export const DELETE = 'DELETE';
export const LINK_DELETE = 'LINK_DELETE';
export const CREATE = 'CREATE';
export const EDIT = 'EDIT';
export const LIST = 'LIST';
export const GET = 'GET';


export const deleteLink = (link) => {
    const payload = apiDel(`/delete/${link.id}`);
    return {type: DELETE, payload};
};

export const getDelLink = (link) => {
    return {type: LINK_DELETE, payload: link}
}

export const createLink = (data) => {
    const payload = apiPost('/create', data);
    return {type: CREATE, payload};
};

export const getLink = (id) => {
    const payload = apiGet(`/list/${id}`);
    return {type: GET, payload}; 
};

export const listLink = () => {
    const payload = apiGet('/list');
    return {type: LIST, payload};
};

export const editLink = (id, data) => {
    const payload = apiPut(`/edit/${id}`, data);
    return {type: EDIT, payload};
};

