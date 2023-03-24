const { MongoClient } = require('mongodb');


let Mongo = {
    db: null,
    users: null,


    async connet() {
        try {
            //DB connection
            let client = await new MongoClient(process.env.mongo_url);
            await client.connect();
            console.log('connection sucess')

            //DB name
            this.db = await client.db(process.env.mongo_name)
            console.log(`connected to ${process.env.mongo_name}`)

            //db collection
            this.users = await this.db.collection('users');
            console.log('mongo collection initilized');

        }
        catch (error) {
            throw new Error(error);
        }
    }

}

module.exports = Mongo;
