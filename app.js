const express = require('express');
const app = express();
const accounts = require('./accounts.js');

app.use(express.json());
app.use(express.static('public'));

app.post('/create-account', async (req, res) => {
  await accounts.createAccount(req, res);
});

app.post('/login-account', (reg, res) => {
  
});

app.post('/validate-session', async (req, res) => {
  await accounts.validateSession(req, res);
});

app.listen(3000, () => console.log("Listening..."));