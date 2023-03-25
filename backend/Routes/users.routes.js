const route = require('express').Router();

const { getuser, accountDeactivate, accountActivate, changepassword } = require('../Services/users.services');

route.get('/', getuser);
route.post('/account/deactivate', accountDeactivate);
route.post('/account/activate', accountActivate);
route.post('/account/resetpassword', changepassword);

module.exports = route;