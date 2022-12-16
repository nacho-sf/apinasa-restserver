const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const { uploadFile } = require('../helpers');

const { Landing,
        Nea,
        User } = require('../models');





const loadFile = async( req, res ) => {

    try {
        //const fullPath = await uploadFile( req.files, ['txt', 'md'] );
        const fullPath = await uploadFile( req.files, undefined, 'imgs' );
        res.json({ name: fullPath });
    } catch (msg) {
        res.status(400).json({ msg });
    };

};




const updateImg = async( req, res ) => {

    const { id, collection } = req.params;

    let model;

    switch ( collection ) {
        case 'landings':
            model = await Landing.findById( id );
            if ( !model ) {
                return res.status(400).json({
                    msg: `${id} landing ID do not exists`
                });
            };
        break;

        case 'neas':
            model = await Nea.findById( id );
            if ( !model ) {
                return res.status(400).json({
                    msg: `${id} nea ID do not exists`
                });
            };
        break;

        case 'users':
            model = await User.findById( id );
            if ( !model ) {
                return res.status(400).json({
                    msg: `${id} user ID do not exists`
                });
            };
        break;
    
        default:
            return res.status(500).json({ msg: 'Forget validate this' });
    };


    if ( model.img ) {
        const pathImg = path.join( __dirname, '../uploads', collection, model.img );
        if ( fs.existsSync( pathImg ) ) {
            fs.unlinkSync( pathImg );
        };
    };


    const fullPath = await uploadFile( req.files, undefined, collection );
    model.img = fullPath;
    await model.save();
    res.json( model );
};




const updateImgCloudinary = async( req, res ) => {

    const { id, collection } = req.params;

    let model;

    switch ( collection ) {
        case 'landings':
            model = await Landing.findById( id );
            if ( !model ) {
                return res.status(400).json({
                    msg: `${id} landing ID do not exists`
                });
            };
        break;

        case 'neas':
            model = await Nea.findById( id );
            if ( !model ) {
                return res.status(400).json({
                    msg: `${id} nea ID do not exists`
                });
            };
        break;

        case 'users':
            model = await User.findById( id );
            if ( !model ) {
                return res.status(400).json({
                    msg: `${id} user ID do not exists`
                });
            };
        break;
    
        default:
            return res.status(500).json({ msg: 'Forget validate this' });
    };


    if ( model.img ) {
        const nameArr = model.img.split('/');
        const name = nameArr[ nameArr.length - 1 ];
        const [ public_id ] = name.split('.');
        cloudinary.uploader.destroy( public_id );
    };

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
    model.img = secure_url;
    await model.save();
    res.json( model );
};




const showImg = async( req, res ) => {

    const { id, collection } = req.params;

    let model;

    switch ( collection ) {
        case 'landings':
            model = await Landing.findById( id );
            if ( !model ) {
                return res.status(400).json({
                    msg: `${id} landing ID do not exists`
                });
            };
        break;

        case 'neas':
            model = await Nea.findById( id );
            if ( !model ) {
                return res.status(400).json({
                    msg: `${id} nea ID do not exists`
                });
            };
        break;

        case 'users':
            model = await User.findById( id );
            if ( !model ) {
                return res.status(400).json({
                    msg: `${id} user ID do not exists`
                });
            };
        break;
    
        default:
            return res.status(500).json({ msg: 'Forget validate this' });
    };


    if ( model.img ) {
        const pathImg = path.join( __dirname, '../uploads', collection, model.img );
        if ( fs.existsSync( pathImg ) ) {
            return res.sendFile( pathImg );
        };
    };
    const pathNoImg = path.join( __dirname, '../assets/placeholder.png' );
    res.sendFile( pathNoImg );
};




module.exports = {
    loadFile,
    updateImg,
    updateImgCloudinary,
    showImg
};