const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJwt = async( req, res, next ) => {

    const token = req.header('auth-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'Token is required'
        });
    };

    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // Read uid user
        const user = await User.findById( uid );

        if ( !user ) {
            return res.status(401).json({
                msg: 'Token is not valid - User does not exist in DB'
            });
        };

        // Check uid have true state
        if ( !user.state ) {
            return res.status(401).json({
                msg: 'Token is not valid - User state = false'
            });
        };

        req.user = user;
        next();

    } catch ( error ) {
        console.log( error );
        res.status(401).json({
            msg: 'Token is not valid'
        });
    };

};



module.exports = { validateJwt };