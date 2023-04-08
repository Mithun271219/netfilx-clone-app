const express = require('express');
const dotenv = require('dotenv');

const { logging, jwtValidation } = require('./shared/middleware')
const { connect } = require('./shared/mongo');
const createAccount = require('./Routes/signUp.routes');
const singIn = require('./Routes/signIn.routes');
const user = require('./Routes/users.routes');
const movies = require('./Routes/movies.routes');
const notValidURL = require('./Routes/notVURL.routes');

const app = express();
dotenv.config();

(async () => {
    try {
        //db connection
        await connect();

        //using json formating
        app.use(express.json());

        app.use(logging);

        //routes
        app.use('/register', createAccount);
        app.use('/signin', singIn);

        //token validation
        app.use(jwtValidation);

        app.use('/user', user);
        app.use('/movies', movies);


        app.use('/*', notValidURL);

        app.listen(process.env.port, () => console.log('server listening to port-', process.env.port));

    } catch (error) {
        console.log(error)
        process.exit();
    }
})()