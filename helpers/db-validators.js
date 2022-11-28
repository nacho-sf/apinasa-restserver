const Role = require('../models/role');
const User = require('../models/user');

const checkRoleExists = async( role ) => {
    const roleExists = await Role.findOne({ role });
    if ( !roleExists ) {
        throw new Error(`Role ${ role } is not registered in database`);
    };
};

const checkEmailExists = async( email ) => {
    const emailExists = await User.findOne({ email });
    if ( emailExists ) {
        throw new Error(`Email ${ email } is already registered`);
    };
};

const checkIdExists = async( id ) => {
    const idExists = await User.findById( id );
    if ( !idExists ) {
        throw new Error(`Does not exist ID: ${ id }`);
    };
};

const checkNickExists = async( nickname ) => {
    const nickExists = await User.findOne({ nickname });
    if ( nickExists ) {
        throw new Error(`Nick ${ nickname } is already registered`);
    };
};

module.exports = { 
    checkRoleExists,
    checkEmailExists,
    checkIdExists,
    checkNickExists
 };