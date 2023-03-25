const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');

const { users } = require('../shared/mongo');
const { passwaordChange, validate } = require('../Schemas/schemas')

module.exports = {
    async getuser(req, res) {
        try {
            let data = await this.users.findOne({ _id: new ObjectId(req.user._id) });
            delete data.password
            delete data.createdOn
            delete data.modifiedOn
            delete data._id
            data.active ? res.json(data) : res.json({ message: "user is inactive" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "error geting user details" })
        }
    },

    async accountDeactivate(req, res) {
        try {
            await this.users.findOneAndUpdate({ _id: new ObjectId(req.user._id) }, { $set: { active: false, modifiedOn: new Date().toLocaleString() } });
            res.json({ message: 'account de-activation success' })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "error de-activating account" })
        }
    },

    async accountActivate(req, res) {
        try {
            await this.users.findOneAndUpdate({ _id: new ObjectId(req.user._id) }, { $set: { active: true, modifiedOn: new Date().toLocaleString() } });
            res.json({ message: 'account activation success' })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "error activating account" })
        }
    },

    async changepassword(req, res) {
        try {
            let isValidPassword = await validate(passwaordChange, req.body);
            if (isValidPassword) return res.status(500).json({ message: isValidPassword });
            delete req.body.cpassword;

            req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(3));
            await this.users.findOneAndUpdate({ _id: new ObjectId(req.user._id) }, { $set: { password: req.body.password, modifiedOn: new Date().toLocaleString() } })
            res.json({ message: 'password changed successfully' });
        } catch (error) {
            console.log(error);
            // res.status(500).json({ message: "error while changing password" })
        }
    }
}