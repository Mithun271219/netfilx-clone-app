const route = require('express').Router();

const { createaccount, getallusers } = require('../Services/signUp.services');

route.post('/', createaccount);
route.get('/users', getallusers)

module.exports = route;