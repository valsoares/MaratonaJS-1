const Joi = require('@hapi/joi');
const { request, response } = require('express');
const {getValidatorError} = require('../helpers/validator');

const rules = {
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    password_confirmation: Joi.string().valid(Joi.ref('password')).required(),
};

const accountSingIn = (request, response, next) => {
    const {email, password} = request.body;

    const schema = Joi.object({
        email: rules.email,
        password: rules.password
    });

    const {error} = schema.validate({ email, password}, {abortEarly: false});
    if(error) {
        const messages = getValidatorError(error);
        return response.jsonBadRequest(null, 'Something went wrong!', {error: messages});
    }
    next();
};

const accountSingUp = (request, response, next) => {
    const {email, password, password_confirmation} = request.body;

    const schema = Joi.object({
        email: rules.email,
        password: rules.password,
        password_confirmation: rules.password_confirmation,
    });

    const {error} = schema.validate({ email, password, password_confirmation}, {abortEarly: false});
    if(error) {
        const messages = getValidatorError(error);
        return response.jsonBadRequest(null, 'Something went wrong!', {error: messages});
    }
    next();
};

module.exports = { accountSingUp, accountSingIn };