

const { users } = require('../../Shared/Mongo')

module.exports = {
    async get(req, res) {
        try {
            let data = await this.users.find().toArray();
            res.json(data);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'error while getting data' });
        }
    },
    async registerUser(req, res) {
        try {
            let data = await this.users.insertOne(req.body);
            res.json(data);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'error while registering' });
        }
    }

}