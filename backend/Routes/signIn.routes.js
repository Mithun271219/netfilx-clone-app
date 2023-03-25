
const route = require('express').Router();

const { signIn } = require('../Services/signIn.services');

route.post('/', signIn);

module.exports = route;