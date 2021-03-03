// validation
const Joi = require('@hapi/joi');

// register validation
const registerValidation = (data) =>{
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        firstname: Joi.string().min(1).required(),
        lastname: Joi.string().min(1).required(),
        phone: Joi.string().min(6),
        password: Joi.string().min(8).required()
    });
    return schema.validate(data);
};

// login validation
const loginValidation = (data) =>{
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(8).required()
    });
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
