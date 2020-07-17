const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const {checkJwt} = require('./helpers/jwt');
const response = require('./middlewares/response');

const db = require('./models');

const app = express();

app.use(response);
app.use(cors());
app.use(checkJwt);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(routes);

db.sequelize.sync().then(() => {
    app.listen(3333);
    console.log('escutando a porta 3333...');
});