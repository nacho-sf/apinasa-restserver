const { Landing } = require('../models');


const getLandings = async( req, res ) => {
    try {
        const { limit = 5, from = 0 } = req.query;
        const query = { state: true };
        const [ total, landings ] = await Promise.all([
            Landing.countDocuments( query ),
            Landing.find( query )
                .populate('user', 'email')
                .skip(Number( from ))
                .limit(Number( limit ))
        ]);
        res.status(200).json({ total, landings });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    };
};


const getLanding = async( req, res ) => {
    try {
        const { id } = req.params;
        const landing = await Landing.findById( id )
            .populate('user', 'email');
        res.status(200).json({ landing });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    };
};


const createLanding = async( req, res ) => {
    try {
        const { name, recclass, mass, fall, year, reclat, reclong } = req.body;
        const data = { name, recclass, mass, fall, year, reclat, reclong, 
                       user: req.user._id };
        const landing = new Landing( data );
        await landing.save();
        res.status(201).json({ msg: `Landing ${name} created succesfuly`,
                               landing });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    };
};


const updateLanding = async( req, res ) => {
    try {
        const { id } = req.params;
        const { _id, name, nametype, user, state, nasa_id, ...data } = req.body;
        data.user = req.user._id;
        const landing = await Landing.findByIdAndUpdate( id, data );
        res.status(200).json({ msg: `Landing ${landing.name} updated succesfuly`,
                               landing });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    };
};


const deleteLanding = async( req, res ) => {
    try {
        const { id } = req.params;
        const landing = await Landing.findByIdAndUpdate( id, { state: false } );
        res.status(200).json({ msg: `Landing ${landing.name} deleted succesfuly`,
                               landing });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    };
};


module.exports = {
    getLandings,
    getLanding,
    createLanding,
    updateLanding,
    deleteLanding
};