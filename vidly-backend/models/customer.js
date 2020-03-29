const Joi = require('joi')
const mongoose = require('mongoose')

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength:50
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    isGold: {
        type: Boolean
    }
}))

function validateCustomer(customer){
    const schema = {
        name: Joi.string().max(50).required(),
        phone: Joi.string().min(5).max(20).required(),
        isGold: Joi.boolean()
    }
    return Joi.validate(customer, schema)
}

exports.Customer = Customer
exports.validate = validateCustomer