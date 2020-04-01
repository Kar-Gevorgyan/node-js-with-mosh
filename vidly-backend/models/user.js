const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    },
    isAdmin: Boolean
})

userSchema.methods.generateAuthToken = function() {
    // const token = jwt.sing({ _id: this._id}, config.get('jwtPrivateKey'))
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, 'jwtPrivateKey')
    return token
}

const User = mongoose.model('User', userSchema)

function validateUser(user){
    schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(user, schema)
}

exports.User = User
exports.validate = validateUser