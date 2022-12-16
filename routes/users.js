const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields,
        validateJwt,
        validateRoles,
        validateAdminRole } = require('../middlewares');

const { checkUserRoleExists,
        checkUserEmailNotExists,
        checkUserIdMongoExists } = require('../helpers');

const { getUsers,
        updateUser,
        createUser,
        deleteUser } = require('../controllers/users');

const router = Router();


router.get('/', getUsers );

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('pass', 'Pass is required').not().isEmpty(),
    check('pass', 'Pass has contain six characters at least')
    .isLength({ min:6 }),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom( checkUserEmailNotExists ),
    //check('role').custom( checkUserRoleExists ),
    validateFields
], createUser );

router.put('/:id', [
    check('id', 'Is not valid ID').isMongoId(),
    check('id').custom( checkUserIdMongoExists ),
    //check('role').custom( checkUserRoleExists ),
    validateFields
], updateUser );

router.delete('/:id', [
    validateJwt,
    //validateAdminRole,
    validateRoles('ADMIN_ROLE'),
    check('id', 'Is not valid ID').isMongoId(),
    check('id').custom( checkUserIdMongoExists ),
    validateFields
], deleteUser );


module.exports = router;