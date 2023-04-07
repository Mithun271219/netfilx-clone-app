const route = require('express').Router();

const { getMovies, loadMovies } = require('../Services/movies.services');

route.get('/', getMovies);
route.post('/add', loadMovies);

module.exports = route;