const { MongoClient } = require('mongodb');
const express = require('express');

const { connet, db } = require('./Shared/Mongo');

const app = express();

(async () => {
    try {

        //connection
        await connet();

        app.use(express.json());

        app.get('/get', async (req, resp) => {
            try {
                let data = await this.db.collection('users').find().toArray();
                resp.json(data);
            } catch (error) {
                console.log(error);
            }
        })


        app.listen(process.env.port, () => console.log(`listenting to port-${process.env.port}`))
    }
    catch (error) {
        console.log('error connecting to the server');
        console.log(error);
        process.exit();
    }
})();