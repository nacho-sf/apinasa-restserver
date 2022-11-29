
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields,
        validateJwt,
        validateRoles,
        validateAdminRole } = require('../middlewares');

const { checkRoleExists,
        checkEmailExists,
        checkIdExists } = require('../helpers/db-validators');

const { getUser,
        updateUser,
        createUser,
        deleteUser } = require('../controllers/users');

const router = Router();


router.get('/', getUser );

router.put('/:id',[
    check('id', 'Is not valid ID').isMongoId(),
    check('id').custom( checkIdExists ),
    check('role').custom( checkRoleExists ),
    validateFields
], updateUser );

router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('pass', 'Pass has contain six characters at least').isLength({ min:6 }),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom( checkEmailExists ),
    check('role').custom( checkRoleExists ),
    validateFields
], createUser );

router.delete('/:id',[
    validateJwt,
    //validateAdminRole,
    validateRoles('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'Is not valid ID').isMongoId(),
    check('id').custom( checkIdExists ),
    validateFields
], deleteUser );


module.exports = router;