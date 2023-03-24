const route = require('express').Router();

const { registerUser, get } = require('./Services/Register.services');

route.get('/get', get);
route.post('/register', registerUser);

module.exports = route;