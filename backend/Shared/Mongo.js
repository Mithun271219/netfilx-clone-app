const { MongoClient } = require('mongodb');

module.exports = {
    db: null,
    users: null,
    movies: null,

    async connect() {
        try {
            //db connection 
            let client = await new MongoClient(process.env.mongo_url)
            client.connect();
            console.log('db connection success');

            //db name
            this.db = await client.db(process.env.mongo_name);
            console.log('conneted to', process.env.mongo_name, 'clone db');

            //db collections
            this.users = await this.db.collection('users');
            this.movies = await this.db.collection('movies');
            console.log('db collection initilized');

        } catch (error) {
            throw new Error(error);
        }
    }
}