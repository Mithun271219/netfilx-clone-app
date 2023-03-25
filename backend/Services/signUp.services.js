const bcrypt = require('bcryptjs');

const { users } = require('../shared/mongo');
const { validate, signUpSchema } = require('../Schemas/schemas')

module.exports = {
    async createaccount(req, res) {
        try {
            //validation
            let formvalidation = await validate(signUpSchema, req.body)
            formvalidation && res.status(500).json({ message: formvalidation });


            delete req.body.cpassword;
            let salt = await bcrypt.genSalt(3);
            req.body.password = await bcrypt.hash(req.body.password, salt);

            await this.users.insertOne({ ...req.body, active: true, createdOn: new Date().toLocaleString(), modifiedOn: new Date().toLocaleString() });
            res.json({ message: 'account created successfully!' });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'error creating account' });
        }
    },
    async getallusers(req, res) {
        try {
            let data = await this.users.find().toArray();
            res.json(data);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'error fetching users details' });
        }
    }
}