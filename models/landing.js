const { Schema, model } = require('mongoose');

const LandingSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    nasa_id: {
        type: Number,
        unique: true
    },
    nametype: {
        type: String,
        default: 'Valid',
        required: [true, 'Nametype is required']
    },
    recclass: {
        type: String,
        default: 'Unknown',
        enum: ['CV3','H/L3.9','Mesosiderite-A3/4','LL3.2','Howardite','Eucrite','CI1','H3/4','Eucrite-br','C3-ung','H4-6','EL6','Iron, IIIAB','Stone-uncl','Iron, IAB-ung','Mesosiderite-A3','Martian (shergottite)','Iron, IID','Iron, IIAB','LL5','L3.6','L5','CM2','Iron, IAB-sHL','Angrite','Pallasite, PMG','Eucrite-cm','CO3.5','CR2-an','Martian (chassignite)','Eucrite-mmict','LL3-6','EH7-an','L3-6','L5-6','H6','Iron, IVA','EH5','LL3.3','Ureilite-an','H5/6','H4-an','R3.8-6','CO3.4','OC','H3.7','L/LL6','Iron?','H3-6','H3-5','L/LL5','CR2','Iron','Ureilite','H4-5','Martian (nakhlite)','Iron, IIE-an','Achondrite-ung','L4-6','H3-4','Iron, IIF','Lodranite','L3','L3.7','H4','LL4','Mesosiderite-A1','H5','H5-6','C2-ung','L4','L6','H3.8','Iron, IIE','Acapulcoite','Mesosiderite','Iron, IAB-sLL','LL3.9','Eucrite-pmict','EH3/4-an','H','LL3.8','CK4','L3-4','LL3.15','Iron, IAB-MG','K3','CO3.3','H/L4','L5/6','Pallasite','CO3.2','H3','Winonaite','Aubrite','LL3.6','LL6','H/L3.6','L/LL4','CO3.6','L','L3.4','H5-7','LL3.00','EH3','Diogenite-pm','CBa','LL','H4/5','EH4','Diogenite','H?','Iron, ungrouped','H3.4','L3.7-6','LL3.4','C','Unknown'],
        required: [true, 'Class is required']
    },
    mass: {
        type: Number,
        default: 0,
        required: [true, 'Mass is required']
    },
    fall: {
        type: String,
        default: 'Unknown',
        enum: ['Fell', 'Found', 'Unknown'],
        required: [true, 'Fall is required']
    },
    year: {
        type: Date,
        default: '2000-01-01',
        required: [true, 'Year is required']
    },
    reclat: {
        type: Number,
        default: 0,
        required: [true, 'latitude is required']
    },
    reclong: {
        type: Number,
        default: 0,
        required: [true, 'Longitude is required']
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    img: {
        type: String
    }
});

LandingSchema.methods.toJSON = function() {
    const { _id, __v, state, ...landing } = this.toObject();
    landing.landing_id = _id;
    return landing;
};

module.exports = model( 'Landing', LandingSchema );