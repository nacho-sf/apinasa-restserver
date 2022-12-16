const { User,
        Role,
        Landing,
        Nea } = require('../models');
        


// USER

const checkUserIdMongoExists = async( id ) => {
    const userIdExists = await User.findById( id );
    if ( !userIdExists ) {
        throw new Error(`Does not exist user ID: ${ id }`);
    };
};

const checkUserEmailNotExists = async( email ) => {
    const emailExists = await User.findOne({ email });
    if ( emailExists ) {
        throw new Error(`Email ${ email } is already registered`);
    };
};


// ROLE

const checkUserRoleExists = async( role ) => {
    const roleExists = await Role.findOne({ role });
    if ( !roleExists ) {
        throw new Error(`Role ${ role } is not valid`);
    };
};


// LANDING

const checkLandIdMongoExists = async( id ) => {
    const landIdExists = await Landing.findById( id );
    if ( !landIdExists ) {
        throw new Error(`Does not exist landing ID: ${ id }`);
    };
};

const checkLandNameNotExists = async( name ) => {
    const nameExists = await Landing.findOne({ name });
    if ( nameExists ) {
        throw new Error(`Name ${ name } is already registered`);
    };
};


// NEA

const checkNeaIdMongoExists = async( id ) => {
    const neaIdExists = await Nea.findById( id );
    if ( !neaIdExists ) {
        throw new Error(`Does not exist nea ID: ${ id }`);
    };
};

const checkNeaDesignationNotExists = async( designation ) => {
    const designationExists = await Nea.findOne({ designation });
    if ( designationExists ) {
        throw new Error(`Designation ${ designation } is already registered`);
    };
};


// COLLECTIONS

const allowedCollections = ( collection = '', collections = [] ) => {
    const include = collections.includes( collection );
    if ( !include ) {
        throw new Error( `${collection} collection is not allowed. Allowed collections: ${collections}` );
    };
    return true;
};



module.exports = {
    checkUserIdMongoExists, 
    checkUserEmailNotExists,
    checkUserRoleExists,
    checkLandIdMongoExists,
    checkLandNameNotExists,
    checkNeaIdMongoExists,
    checkNeaDesignationNotExists,
    allowedCollections
 };