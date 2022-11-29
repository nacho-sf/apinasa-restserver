const validateAdminRole = ( req, res, next ) => {

    if ( !req.user ) {
        return res.status(500).json({
            msg: 'Role verification not possible before token validation'
        });
    };

    const { role, name } = req.user;

    if ( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ name } is not admin - Action denied`
        });
    };

    next();
};



const validateRoles = ( ...roles ) => {
    return ( req, res, next ) => {
    
        if ( !req.user ) {
            return res.status(500).json({
                msg: 'Role verification before token validation'
            });
        };

        if ( !roles.includes( req.user.role ) ) {
            return res.status(401).json({
                msg: `One of these roles are required: ${ roles }`
            });
        };

        next();
    };
};



module.exports = {
    validateAdminRole,
    validateRoles
}