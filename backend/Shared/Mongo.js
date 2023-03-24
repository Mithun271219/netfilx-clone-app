const { MongoClient } = require('mongodb');


let Mongo = {
    db: null,


    async connet() {
        try {
            //DB connection
            let client = await MongoClient(process.env.mongo_url);
            console.log('connection sucess')

            //DB collection
            this.db = await client.db(process.env.mongo_name)
            console.log(`connected to ${process.env.mongo_name}`)

        }
        catch (error) {
            throw new Error(error);
        }
    }

}

module.exports = Mongo;
