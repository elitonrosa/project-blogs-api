require('dotenv').config();

const express = require('express');
const { loginController } = require('./controllers');
const validateLogin = require('./middlewares/validateLogin');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', validateLogin, loginController.login);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
