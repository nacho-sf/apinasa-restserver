require('dotenv').config();
require('mongoose').mongoose.set('strictQuery', false);

const Server = require('./models/server');

const server = new Server();

server.listen();