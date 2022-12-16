const { ObjectId } = require('mongoose').Types;

const { Landing,
        Nea,
        User } = require('../models');

const allowedCollections = [
    'landings',
    'landingsbyuser',
    'neas',
    'neasbyuser',
    'users'
];


const searchLandings = async( term = '', res ) => {

    const isMongoId = ObjectId.isValid( term );

    if ( isMongoId ) {
        const landing = await Landing
            .findById( term )
            .populate('user', 'email');
        return res.json({
            results: ( landing ) ? [ landing ] : []
        });
    };

    const regex = new RegExp( term, 'i' );

    const count = await Landing
        .countDocuments({ $or: [{ name: regex }, 
                                { recclass: regex }, 
                                { fall: regex }], 
                          $and: [{ state: true }] 
                        });

    const landings = await Landing
        .find({ $or: [{ name: regex }, 
                      { recclass: regex }, 
                      { fall: regex }], 
                $and: [{ state: true }] 
              })
        .populate('user', 'email');

    res.json({
        total: count,
        results: landings
    });
    
};


const searchLandingsByUser = async( term = '', res ) => {

    const isMongoId = ObjectId.isValid( term );

    if ( isMongoId ) {
        const count = await Landing
            .countDocuments({ user: ObjectId( term ), state: true });
        const landing = await Landing
            .find({ user: ObjectId( term ), state: true })
            .populate('user', 'email');
        return res.json({
            total: ( count ) ? count : [],
            results: ( landing ) ? landing : []
        });
    };

    const regex = new RegExp( term, 'i' );

    const users = await User.find({ email: regex, state: true });

    if ( !users.length ) {
        return res.status(400).json({ 
            msg: `There is no results with "${term}" search term` });
    };

    const count = await Landing
        .countDocuments({ $or: [...users.map( u => { return { user: u._id } } )], 
                          $and: [{ state: true }] 
                        });

    const landings = await Landing
        .find({ $or: [...users.map( u => { return { user: u._id } } )], 
                $and: [{ state: true }] 
              })
        .populate('user', 'email');

    res.json({
        total: count,
        results: landings
    });

};


const searchNeas = async( term = '', res ) => {

    const isMongoId = ObjectId.isValid( term );

    if ( isMongoId ) {
        const nea = await Nea
            .findById( term )
            .populate('user', 'email');

        return res.json({
            results: ( nea ) ? [ nea ] : []
        });
    };

    const regex = new RegExp( term, 'i' );

    const count = await Nea
        .countDocuments({ $or: [{ designation: regex }, 
                                { orbit_class: regex }], 
                          $and: [{ state: true }] 
                        });

    const neas = await Nea
        .find({ $or: [{ designation: regex }, 
                      { orbit_class: regex }], 
                $and: [{ state: true }] })
        .populate('user', 'email');

    res.json({
        total: count,
        results: neas
    });

};


const searchNeasByUser = async( term = '', res ) => {

    const isMongoId = ObjectId.isValid( term );

    if ( isMongoId ) {
        const count = await Nea
            .countDocuments({ user: ObjectId( term ), state: true });
        const neas = await Nea
            .find({ user: ObjectId( term ), state: true })
            .populate('user', 'email');
        return res.json({
            total: ( count ) ? count : [],
            results: ( neas ) ? neas : []
        });
    };

    const regex = new RegExp( term, 'i' );

    const users = await User.find({ email: regex, state: true });

    if ( !users.length ) {
        return res.status(400).json({ 
            msg: `There is no results with "${term}" search term` });
    };

    const count = await Nea
        .countDocuments({ $or: [...users.map( u => { return { user: u._id } } )], 
                          $and: [{ state: true }] 
                        });

    const neas = await Nea
        .find({ $or: [...users.map( u => { return { user: u._id } } )], 
                $and: [{ state: true }] 
              })
        .populate('user', 'email');

    res.json({
        total: count,
        results: neas
    });

};


const searchUsers = async( term = '', res ) => {

    const isMongoId = ObjectId.isValid( term );

    if ( isMongoId ) {
        const user = await User
            .findById( term );

        return res.json({
            results: ( user ) ? [ user ] : []
        });
    };

    const regex = new RegExp( term, 'i' );

    const count = await User
        .countDocuments({ $or: [{ name: regex }, 
                                { email: regex }], 
                          $and: [{ state: true }] 
                        });

    const users = await User
        .find({ $or: [{ name: regex }, 
                      { email: regex }], 
                $and: [{ state: true }] 
              });

    res.json({
        total: count,
        results: users
    });

};


const search = ( req, res ) => {

    const { collection, term } = req.params;

    if ( !allowedCollections.includes( collection ) ) {
        return res.status(400).json({
            msg: 'Collections allowed are: landings, neas or users'
        });
    };

    switch (collection) {
        case 'landings':
            searchLandings( term, res );
            break;

        case 'landingsbyuser':
            searchLandingsByUser( term, res );
            break;
        
        case 'neas':
            searchNeas( term, res );
            break;

        case 'neasbyuser':
            searchNeasByUser( term, res );
            break;

        case 'users':
            searchUsers( term, res );
            break;
    
        default:
            res.status(500).json({
                msg: 'Forget make search'
            });
    };

};


module.exports = {
    search
};