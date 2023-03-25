const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { users } = require('../shared/mongo');
const { validate, singInSchema } = require('../Schemas/schemas')

module.exports = {
    async signIn(req, res) {
        try {
            //validation 
            let formvalidation = await validate(singInSchema, req.body);
            formvalidation && res.status(500).json({ message: formvalidation });

            let isuser = await this.users.findOne({ email: req.body.email });
            if (!isuser) return res.status(401).json({ message: 'user not found please create new account', link: 'http://localhost:5000/register' });

            let isValiduser = await bcrypt.compare(req.body.password, isuser.password)
            if (isValiduser) {
                let token = await jwt.sign({ _id: isuser._id, name: isuser.name }, process.env.jwtkey, { expiresIn: process.env.jwtexpiery })
                res.json({ message: 'login success', token });
            } else {
                res.status(401).json({ message: "password or email doesn't match" })
            }

        } catch (error) {
            console.log(error);
            // res.status(500).json({ message: 'error while signing In' })
        }
    }
}