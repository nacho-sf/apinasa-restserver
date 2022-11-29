const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    nickname: {
        type: String,
        default: 'John Doe'
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    pass: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        default: 'USER_ROLE'
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    img: {
        type: String
    },
    affiliatedNumber: {
        type: Number,
        unique: true
    },
    affiliationDate: {
        type: Date,
        default: new Date()
    },
    birthdate: {
        type: Date
    },
    occupation: {
        type: String
    },
    neasDiscovered: {
        type: Array
    }
});


UserSchema.plugin(AutoIncrement, {
    id:'affiliatedNumber_counter',
    inc_field: 'affiliatedNumber'
});


UserSchema.methods.toJSON = function() {
    const { _id, pass, __v, ...user } = this.toObject();
    user.uid = _id;
    return user;
};



module.exports = model( 'User', UserSchema );