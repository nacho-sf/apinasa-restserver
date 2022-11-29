const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.pathAuth = '/api/auth';
        this.pathUsers = '/api/users';
        this.dbConnect();
        this.middlewares();
        this.routes();
    };

    async dbConnect() {
        await dbConnection();
    };

    middlewares() {
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.static('public') );
    };

    routes() {
        this.app.use( this.pathAuth, require('../routes/auth'));
        this.app.use( this.pathUsers, require('../routes/users'));
    };

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server listening on port', this.port );
        });
    };
};

module.exports = Server;