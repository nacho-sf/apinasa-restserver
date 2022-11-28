const bcryptjs = require('bcryptjs');

const User = require('../models/user');



const getUser = async(req, res) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };

    const [ total, users ] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
            .limit(Number( limit ))
            .skip(Number( from ))
    ]);

    res.json({ total, users });
};


const createUser = async(req, res) => {

    const { name, nickname, email, pass, role } = req.body;
    const user = new User({ name, nickname, email, pass, role });

    const salt = bcryptjs.genSaltSync();
    user.pass = bcryptjs.hashSync( pass, salt );

    await user.save();

    res.json({ user });
};


const updateUser = async(req, res) => {

    const { id } = req.params;
    const { _id, pass, google, email, ...rest } = req.body;

    if ( pass ) {
        const salt = bcryptjs.genSaltSync();
        rest.pass = bcryptjs.hashSync( pass, salt );
    };

    const user = await User.findByIdAndUpdate( id, rest );

    res.json(user);
};


const deleteUser = async(req, res) => {

    const { id } = req.params;

    const user = await User.findByIdAndUpdate( id, { state: false } );
    const authUser = req.user;

    res.json({ user, authUser });
};



module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser
};