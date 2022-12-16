const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/astronomy/auth',
            landings:   '/api/astronomy/landings',
            neas:       '/api/astronomy/neas',
            search:     '/api/astronomy/search',
            uploads:    '/api/astronomy/uploads',
            users:      '/api/astronomy/users'
        };

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
        this.app.use( fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    };

    routes() {
        this.app.use( this.paths.auth, require('../routes/auth') );
        this.app.use( this.paths.landings, require('../routes/landings') );
        this.app.use( this.paths.neas, require('../routes/neas') );
        this.app.use( this.paths.search, require('../routes/search') );
        this.app.use( this.paths.uploads, require('../routes/uploads') );
        this.app.use( this.paths.users, require('../routes/users') );
    };

    listen() {
        this.app.listen( this.port, () => {
            console.log( 'Server listening on port', this.port );
        });
    };
};

module.exports = Server;