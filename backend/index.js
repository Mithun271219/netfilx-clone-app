const { MongoClient } = require('mongodb');
const express = require('express');
const dotenv = require('dotenv');

const { connet, db } = require('./Shared/Mongo');
const Users = require('./Routes/Register.rotues');
const { logging } = require('./Shared/middleware');

const app = express();
dotenv.config();

(async () => {
    try {

        //connection
        await connet();

        app.use(express.json());
        app.use(logging);

        //routes

        app.use('/users', Users);


        app.listen(process.env.port, () => console.log(`listenting to port-${process.env.port}`));
    }
    catch (error) {
        console.log('error connecting to the server');
        console.log(error);
        process.exit();
    }
})()