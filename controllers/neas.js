const { Nea } = require('../models');


const getNeas = async( req, res ) => {
    try {
        const { limit = 5, from = 0 } = req.query;
        const query = { state: true };
        const [ total, neas ] = await Promise.all([
            Nea.countDocuments( query ),
            Nea.find( query )
                .populate('user', 'email')
                .skip(Number( from ))
                .limit(Number( limit ))
        ]);
        res.status(200).json({ total, neas });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    };
};


const getNea = async( req, res ) => {
    try {
        const { id } = req.params;
        const nea = await Nea.findById( id )
            .populate('user', 'email');
        res.status(200).json({ nea });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    };
};


const createNea = async( req, res ) => {
    try {
        const { designation, discovery_date, h_mag, moid_au, q_au_1, 
                q_au_2, period_yr, i_deg, pha, orbit_class } = req.body;
        const data = { designation, discovery_date, h_mag, moid_au, q_au_1, 
                       q_au_2, period_yr, i_deg, pha, orbit_class, 
                       user: req.user._id };
        const nea = new Nea( data );
        await nea.save();
        res.status(201).json({ msg: `Nea ${designation} created succesfuly`,
                               nea });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    };
};


const updateNea = async( req, res ) => {
    try {
        const { id } = req.params;
        const { _id, designation, user, state, ...data } = req.body;
        data.user = req.user._id;
        const nea = await Nea.findByIdAndUpdate( id, data );
        res.status(200).json({ msg: `Nea ${nea.designation} updated succesfuly`,
                               nea });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    };
};


const deleteNea = async( req, res ) => {
    try {
        const { id } = req.params;
        const nea = await Nea.findByIdAndUpdate( id, { state: false } );
        res.status(200).json({ msg: `Nea ${nea.designation} deleted succesfuly`,
                               nea });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    };
};


module.exports = {
    getNeas,
    getNea,
    createNea,
    updateNea,
    deleteNea
};