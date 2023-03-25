const express = require('express');
const dotenv = require('dotenv');

const { logging } = require('./shared/middleware')
const { connect } = require('./shared/mongo');
const createAccount = require('./Routes/signUp.routes');
const singIn = require('./Routes/signIn.routes');

const app = express();
dotenv.config();

(async () => {
    try {
        //db connection
        await connect();

        app.use(express.json());

        app.use(logging);

        //routes
        app.use('/register', createAccount);
        app.use('/signin', singIn);

        app.listen(process.env.port, () => console.log('server listening to port-', process.env.port));

    } catch (error) {
        console.log(error)
        process.exit();
    }
})()