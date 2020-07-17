const {Account} = require('../models');
const {generateJwt, generateRefreshJwt, getTokenFromHeaders, verifyRefreshJwt} = require('../helpers/jwt');

const bcrypt = require('bcrypt');

module.exports = {
    async create(request, response) {
        const {email, password, password_confirmation} = request.body;

        const account = await Account.findOne({ where: {email:email} });
        if(account) return response.jsonBadRequest(null, 'Account already exists!');

        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);

        const newAccount = await Account.create({
            email,
            password: hash,
            password_confirmation: hash
        });

        const token = generateJwt({id: newAccount.id});
        const refreshToken = generateRefreshJwt({id: newAccount.id, version: newAccount.jwtVersion});

        return response.jsonOK(newAccount,'Account created successfully!', {token, refreshToken});
    },

    async login(request, response) {
        const {email, password} = request.body;
        const account = await Account.findOne({ where: {email:email} });
        if(!account) return response.jsonBadRequest(null, "Account doesn't exists!");

        const match = bcrypt.compareSync(password, account.password);
        if(!match) return response.jsonBadRequest(null, 'Incorrect password!');

        const token = generateJwt({id: account.id});
        const refreshToken = generateRefreshJwt({id: account.id, version: account.jwtVersion});

        return response.jsonOK(account,'Successful login!', {token, refreshToken});
    },

    async refresh(request, response) {

        const token = getTokenFromHeaders(request.headers);
        if(!token) { return response.jsonUnauthorized(null, 'Invalid token!');}

        try {
            const decoded = verifyRefreshJwt(token);
            const account = await Account.findByPk(decoded.id);
            if(!account || (decoded.version !== account.jwtVersion)) return response.jsonUnauthorized(null, 'Invalid token!');

            const meta = generateJwt({ id: account.id });
            console.log('meta: ', meta);
            return response.jsonOK(null, null, meta);
            
        } catch (error) {
            return response.jsonUnauthorized(null, 'Invalid token!');
        }

    }
} 