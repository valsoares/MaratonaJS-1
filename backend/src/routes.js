const express = require('express');
const accountController = require('./controllers/accountController');
const linkController = require('./controllers/linkController');
const {accountSingUp, accountSingIn} = require('./validators/account');

const routes = express.Router();

routes.post('/singin', accountSingIn, accountController.login);

routes.post('/singup', accountSingUp, accountController.create);

routes.post('/refresh', accountController.refresh);

routes.get('/list/:id', linkController.listOne);

routes.get('/list', linkController.list);

routes.post('/create', linkController.create);

routes.put('/edit/:id', linkController.edit);

routes.delete('/delete/:id', linkController.delete);


module.exports = routes;