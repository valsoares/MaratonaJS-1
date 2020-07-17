const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const tokenPrivateKey = process.env.JWT_TOKEN_PRIVATE_KEY;
const refreshTokenPrivateKey = process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY;

const options = { expiresIn: '30 minutes' };
const refreshOptions = { expiresIn: '30 days' };

const generateJwt = (payload) => {
    return jwt.sign(payload, tokenPrivateKey, options);
};

const generateRefreshJwt = (payload) => {
    return jwt.sign(payload, refreshTokenPrivateKey, refreshOptions);
};

const verifyJwt = (token) => {
    return jwt.verify(token, tokenPrivateKey);
};

const verifyRefreshJwt = (token) => {
    return jwt.verify(token, refreshTokenPrivateKey);
};

const checkJwt = (request, response, next) => {
    const {url:path} = request;
    const excludedPath = ['/singin', '/singup', '/refresh'];
    const isExcluded = !!excludedPath.find(p => p.startsWith(path));
    if(isExcluded) return next();

    let token = request.headers['authorization'];
    token = token ? token.slice(7, token.length) : null;
    if(!token) { return response.jsonUnauthorized(null, 'Invalid token!');}

    try{
        const decoded = verifyJwt(token);
        request.accountId = decoded.id;
        next();
    }catch(error) {
        return response.jsonUnauthorized(null, 'Invalid token!');
    }

};

const getTokenFromHeaders = (headers) => {
    let token = headers['authorization'];
    token = token ? token.slice(7, token.length) : null;
    return token;
}

module.exports = {generateJwt, generateRefreshJwt, verifyJwt, verifyRefreshJwt, checkJwt, getTokenFromHeaders};