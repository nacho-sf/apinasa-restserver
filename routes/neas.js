const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, 
        validateJwt,
        validateRoles } = require('../middlewares');

const { checkNeaDesignationNotExists,
        checkNeaIdMongoExists } = require('../helpers');

const { getNeas, 
        getNea, 
        createNea, 
        updateNea, 
        deleteNea } = require('../controllers/neas');

const router = Router();


// Get all neas - Public
router.get('/', getNeas);

// Get nea by id - Public
router.get('/:id', [
    check('id', 'ID is not valid Mongo Id').isMongoId(),
    check('id').custom( checkNeaIdMongoExists ),
    validateFields
], getNea);

// Create nea - Private: Users
router.post('/', [
    validateJwt,
    check('designation','designation field is required').not().isEmpty(),
    check('designation').custom( checkNeaDesignationNotExists ),
    check('discovery_date', 'discovery_date field is required').not().isEmpty(),
    check('discovery_date', 'discovery_date value has to be date format (YYYY-MM-DD)').isDate(),
    check('h_mag', 'h_mag field is required').not().isEmpty(),
    check('h_mag', 'h_mag value has to be decimal').isDecimal(),
    check('moid_au', 'moid_au field is required').not().isEmpty(),
    check('moid_au', 'moid_au value has to be decimal').isDecimal(),
    check('q_au_1', 'q_au_1 field is required').not().isEmpty(),
    check('q_au_1', 'q_au_1 value has to be decimal').isDecimal(),
    check('q_au_2', 'q_au_2 field is required').not().isEmpty(),
    check('q_au_2', 'q_au_2 value has to be decimal').isDecimal(),
    check('period_yr', 'period_yr field is required').not().isEmpty(),
    check('period_yr', 'perido_yr value has to be decimal').isDecimal(),
    check('i_deg', 'i_deg field is required').not().isEmpty(),
    check('i_deg', 'i_deg value has to be decimal').isDecimal(),
    check('pha', 'pha field is required').not().isEmpty(),
    check('pha', 'pha value is not valid. Value has to be: N, Y or n/a').isIn(['N', 'Y', 'n/a']),
    check('orbit_class', 'orbit_class field is required').not().isEmpty(),
    check('orbit_class', 'orbit_class value is not valid. Value has to be: Amor, Apollo, Aten, Comet, Encke-type Comet, Halley-type Comet*, Jupiter-family Comet, Jupiter-family Comet*, Parabolic Comet or Unknow').isIn(['Amor', 'Apollo', 'Aten', 'Comet', 'Encke-type Comet', 'Halley-type Comet*', 'Jupiter-family Comet', 'Jupiter-family Comet*', 'Parabolic Comet', 'Unknown']),
    validateFields
], createNea);

// Update nea by id - Private: Users
router.put('/:id', [
    validateJwt,
    check('id', 'ID is not valid Mongo Id').isMongoId(),
    check('id').custom( checkNeaIdMongoExists ),
    check('discovery_date', 'discovery_date field is required').not().isEmpty(),
    check('discovery_date', 'discovery_date value has to be date format (YYYY-MM-DD)').isDate(),
    check('h_mag', 'h_mag field is required').not().isEmpty(),
    check('h_mag', 'h_mag value has to be decimal').isDecimal(),
    check('moid_au', 'moid_au field is required').not().isEmpty(),
    check('moid_au', 'moid_au value has to be decimal').isDecimal(),
    check('q_au_1', 'q_au_1 field is required').not().isEmpty(),
    check('q_au_1', 'q_au_1 value has to be decimal').isDecimal(),
    check('q_au_2', 'q_au_2 field is required').not().isEmpty(),
    check('q_au_2', 'q_au_2 value has to be decimal').isDecimal(),
    check('period_yr', 'period_yr field is required').not().isEmpty(),
    check('period_yr', 'perido_yr value has to be decimal').isDecimal(),
    check('i_deg', 'i_deg field is required').not().isEmpty(),
    check('i_deg', 'i_deg value has to be decimal').isDecimal(),
    check('pha', 'pha field is required').not().isEmpty(),
    check('pha', 'pha value is not valid. Value has to be: N, Y or n/a').isIn(['N', 'Y', 'n/a']),
    check('orbit_class', 'orbit_class field is required').not().isEmpty(),
    check('orbit_class', 'orbit_class value is not valid. Value has to be: Amor, Apollo, Aten, Comet, Encke-type Comet, Halley-type Comet*, Jupiter-family Comet, Jupiter-family Comet*, Parabolic Comet or Unknow').isIn(['Amor', 'Apollo', 'Aten', 'Comet', 'Encke-type Comet', 'Halley-type Comet*', 'Jupiter-family Comet', 'Jupiter-family Comet*', 'Parabolic Comet', 'Unknown']),
    validateFields
], updateNea);

// Delete nea by id - Private: Admin
router.delete('/:id', [
    validateJwt,
    validateRoles('ADMIN_ROLE'),
    check('id', 'Is not valid ID').isMongoId(),
    check('id').custom( checkNeaIdMongoExists ),
    validateFields
], deleteNea);


module.exports = router;