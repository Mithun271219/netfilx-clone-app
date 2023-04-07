const Joi = require("joi")

module.exports = {
    singInSchema: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    }),

    signUpSchema: Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        cpassword: Joi.ref('password')
    }),

    passwaordChange: Joi.object({
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        cpassword: Joi.ref('password')
    }),

    async validate(schema, data) {
        try {
            await schema.validateAsync(data);
            return false
        } catch ({ details: [error] }) {
            return error.message
        }
    },

    loadMovies: Joi.object({

    })
}