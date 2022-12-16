const { Schema, model } = require('mongoose');

const NeaSchema = Schema({
    designation: {
        type: String,
        required: [true, 'Designation is required'],
        unique: true
    },
    discovery_date: {
        type: Date,
        default: '2000-01-01',
        required: [true, 'Discovery date is required']
    },
    h_mag: {
        type: Number,
        default: 0,
        required: [true, 'h_mag is required']
    },
    moid_au: {
        type: Number,
        default: 0,
        required: [true, 'moid_au is required']
    },
    q_au_1: {
        type: Number,
        default: 0,
        required: [true, 'q_au_1 is required']
    },
    q_au_2: {
        type: Number,
        default: 0,
        required: [true, 'q_au_2 is required']
    },
    period_yr: {
        type: Number,
        default: 0,
        required: [true, 'period_yr is required']
    },
    i_deg: {
        type: Number,
        default: 0,
        required: [true, 'i_deg is required']
    },
    pha: {
        type: String,
        default: 'n/a',
        enum: ['N', 'Y', 'n/a'],
        required: [true, 'pha is required']
    },
    orbit_class: {
        type: String,
        default: 'Unknow',
        enum: ['Amor', 'Apollo', 'Aten', 'Comet', 'Encke-type Comet', 'Halley-type Comet*', 'Jupiter-family Comet', 'Jupiter-family Comet*', 'Parabolic Comet', 'Unknow'],
        required: [true, 'orbit_class is required']
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

NeaSchema.methods.toJSON = function() {
    const { _id, __v, state, ...nea } = this.toObject();
    nea.nea_id = _id;
    return nea;
};

module.exports = model( 'Nea', NeaSchema );