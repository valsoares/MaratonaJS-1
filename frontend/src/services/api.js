import axios from 'axios';
import {getToken, getRefreshToken} from './account';

export const getApiUrl = (path) => {
    return `http://localhost:3333${path}`;
};

export const getHeaders = () => {
    const token = getToken();
    if(!token) return {};

    return {
        Authorization: `Bearer ${token}`,
    }
};

export const apiPost = (path, data = {}) => {
    const url = getApiUrl(path);
    const options = {
        headers: getHeaders(),
    }
    return axios.post(url, data, options);
};

export const apiGet = (path) => {
    const url = getApiUrl(path);
    const options = {
        headers: getHeaders(),
    }
    return axios.get(url, options);
};

export const apiPut = (path, data = {}) => {
    const url = getApiUrl(path);
    const options = {
        headers: getHeaders(),
    }
    return axios.put(url, data, options);
};

export const apiDel = (path) => {
    const url = getApiUrl(path);
    const options = {
        headers: getHeaders(),
    }
    return axios.delete(url, options);
};

export const apiRefreshToken = () => {
    const url = getApiUrl('/refresh');
    const refreshToken = getRefreshToken();
    const options = {
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    }
    return axios.post(url, {}, options);
};

