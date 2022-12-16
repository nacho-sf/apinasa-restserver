const { Schema, model } = require('mongoose');

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
        required: [true, 'Password is required'],
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
    occupation: {
        type: String
    },
    birthdate: {
        type: Date
    },
    neas: {
        type: Array
    }
});

UserSchema.methods.toJSON = function() {
    const { _id, role, state, google, pass, 
            __v, ...user } = this.toObject();
    user.user_id = _id;
    return user;
};

module.exports = model( 'User', UserSchema );