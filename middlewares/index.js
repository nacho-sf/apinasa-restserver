const validateFields = require('./validate-fields');
const validateJwt = require('./validate-jwt');
const validateRoles = require('./validate-roles');
const validateFile = require('./validate-file');

module.exports = {
    ...validateFields,
    ...validateJwt,
    ...validateRoles,
    ...validateFile
};