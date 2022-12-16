const dbValidators = require('./db-validators');
const jwtGeneration = require('./jwt-generation');
const googleVerify = require('./google-verify');
const uploadFile = require('./upload-file');

module.exports = {
    ...dbValidators,
    ...jwtGeneration,
    ...googleVerify,
    ...uploadFile
};