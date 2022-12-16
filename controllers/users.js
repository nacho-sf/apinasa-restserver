const bcryptjs = require('bcryptjs');
const { User } = require('../models');


const getUsers = async( req, res ) => {
    try {
        const { limit = 0, from = 0 } = req.query;
        const query = { state: true };
        const [ total, users ] = await Promise.all([
            User.countDocuments( query ),
            User.find( query )
                .limit(Number( limit ))
                .skip(Number( from ))
        ]);
        res.status(200).json({ total, users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    };
};


const createUser = async( req, res ) => {
    try {
        const { name, email, pass } = req.body;
        const user = new User({ name, email, pass });
        const salt = bcryptjs.genSaltSync();
        user.pass = bcryptjs.hashSync( pass, salt );
        await user.save();
        res.status(200).json({ msg: `User ${user.email} created succesfuly` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    };
};


const updateUser = async( req, res ) => {
    try {
        const { id } = req.params;
        const { _id, email, pass, role, state, google, 
                affiliatedNumber, affiliationDate, neasDiscovered,
                ...rest } = req.body;
        if ( pass ) {
            const salt = bcryptjs.genSaltSync();
            rest.pass = bcryptjs.hashSync( pass, salt );
        };
        const user = await User.findByIdAndUpdate( id, rest );
        res.status(200).json({ msg: `User ${user.email} updated succesfuly` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    };
};


const deleteUser = async( req, res ) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate( id, { state: false } );
        res.status(200).json({ msg: `User ${user.email} deleted succesfuly` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    };
};


module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};