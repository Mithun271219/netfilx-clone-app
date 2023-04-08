const route = require('express').Router();

const { URLnotvalid } = require('../Services/notVURL.services');

route.get('/', URLnotvalid);
route.post('/', URLnotvalid);
route.delete('/', URLnotvalid);
route.put('/', URLnotvalid);

module.exports = route