const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect( process.env.MONGODB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connection established');

    } catch (error) {
        console.log(error);
        throw new Error('Error on MongoDB connection');
    };
};

module.exports = { dbConnection };