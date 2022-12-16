const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields,
        validateFile } = require('../middlewares');

const { allowedCollections } = require('../helpers');

const { loadFile,
        updateImgCloudinary,
        updateImg, 
        showImg } = require('../controllers/uploads');


const router = Router();


router.get('/:collection/:id', [
    check('id', 'ID is not valid Mongo Id').isMongoId(),
    check('collection').custom ( c => allowedCollections( c, ['landings', 'neas', 'users']) ),
    validateFields
], showImg )

router.post('/', validateFile, loadFile )

router.put('/:collection/:id', [
    validateFile,
    check('id', 'ID is not valid Mongo Id').isMongoId(),
    check('collection').custom ( c => allowedCollections( c, ['landings', 'neas', 'users']) ),
    validateFields
], updateImgCloudinary )
// ], updateImg )


module.exports = router;