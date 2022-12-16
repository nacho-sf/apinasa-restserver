const bcryptjs = require('bcryptjs');
const { User } = require('../models');
const { jwtGeneration } = require('../helpers');
const { googleVerify } = require('../helpers');

const login = async(req, res) => {

    const { email, pass } = req.body;
    try {        
        // Email exists verification
        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(400).json({
                msg: `User email ${email} does not registered`
            });
        };
        // Active user state verification
        if ( !user.state ) {
            return res.status(400).json({
                msg: `User ${email} was deleted. Please contact to admin`
            });
        };
        // Pass verification
        const validPass = bcryptjs.compareSync( pass, user.pass );
        if ( !validPass ) {
            return res.status(400).json({
                msg: `${email} user pass is not correct`
            });
        };
        // JWT generation
        const token = await jwtGeneration ( user.id );
        res.json({ email, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Server error. Contact to admin'
        });
    };

};

const googleSignIn = async( req, res ) => {
    
    const { id_token } = req.body;
    try {
        const { email, name, img } = await googleVerify( id_token );
        let user = await User.findOne({ email });
        if ( !user ) {
            const data = {
                name,
                email,
                pass: ':p',
                img,
                google: true
            };
            user = new User( data );
            await user.save();
        };

        if ( !user.state ) {
            return res.status(401).json({
                msg: `User ${email} was deleted. Please contact to admin`
            });
        };
        // JWT generation
        const token = await jwtGeneration ( user.id );
        res.json({
            user,
            token
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Goolge token is not valid'
        });
    };
};

module.exports = {
    login,
    googleSignIn
};