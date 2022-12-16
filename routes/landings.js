const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, 
        validateJwt,
        validateRoles } = require('../middlewares');

const { checkLandNameNotExists,
        checkLandIdMongoExists } = require('../helpers');

const { getLandings,
        getLanding,
        createLanding,
        updateLanding,
        deleteLanding } = require('../controllers/landings');

const router = Router();


// Get all landings - Public
router.get('/', getLandings );

// Get landing by id - Public
router.get('/:id', [
    check('id', 'ID is not valid Mongo Id').isMongoId(),
    check('id').custom( checkLandIdMongoExists ),
    validateFields
], getLanding);

// Create landing - Private: Users or Admin
router.post('/', [
    validateJwt,
    check('name','name field is required').not().isEmpty(),
    check('name').custom( checkLandNameNotExists ),
    check('nametype', 'nametype field is required').not().isEmpty(),
    check('nametype', 'nametype value is not valid. Value has to be: Valid').isIn(['Valid']),
    check('recclass', 'recclass field is required').not().isEmpty(),
    check('recclass', 'recclass value is not valid. Value has to be: CV3, H/L3.9, Mesosiderite-A3/4, LL3.2, Howardite, Eucrite, CI1, H3/4, Eucrite-br, C3-ung, H4-6, EL6, "Iron, IIIAB", Stone-uncl, "Iron, IAB-ung", Mesosiderite-A3, Martian (shergottite), "Iron, IID", "Iron, IIAB", LL5, L3.6, L5, CM2, "Iron, IAB-sHL", Angrite, "Pallasite, PMG", Eucrite-cm, CO3.5, CR2-an, Martian (chassignite), Eucrite-mmict, LL3-6, EH7-an, L3-6, L5-6, H6, "Iron, IVA", EH5, LL3.3, Ureilite-an, H5/6, H4-an, R3.8-6, CO3.4, OC, H3.7, L/LL6, Iron?, H3-6, H3-5, L/LL5, CR2, Iron, Ureilite, H4-5, Martian (nakhlite), "Iron, IIE-an", Achondrite-ung, L4-6, H3-4, "Iron, IIF", Lodranite, L3, L3.7, H4, LL4, Mesosiderite-A1, H5, H5-6, C2-ung, L4, L6, H3.8, "Iron, IIE", Acapulcoite, Mesosiderite, "Iron, IAB-sLL", LL3.9, Eucrite-pmict, EH3/4-an, H, LL3.8, CK4, L3-4, LL3.15, "Iron, IAB-MG", K3, CO3.3, H/L4, L5/6, Pallasite, CO3.2, H3, Winonaite, Aubrite, LL3.6, LL6, H/L3.6, L/LL4, CO3.6, L, L3.4, H5-7, LL3.00, EH3, Diogenite-pm, CBa, LL, H4/5, EH4, Diogenite, H?, "Iron, ungrouped", H3.4, L3.7-6, LL3.4, C or Unknow').isIn(['CV3','H/L3.9','Mesosiderite-A3/4','LL3.2','Howardite','Eucrite','CI1','H3/4','Eucrite-br','C3-ung','H4-6','EL6','Iron, IIIAB','Stone-uncl','Iron, IAB-ung','Mesosiderite-A3','Martian (shergottite)','Iron, IID','Iron, IIAB','LL5','L3.6','L5','CM2','Iron, IAB-sHL','Angrite','Pallasite, PMG','Eucrite-cm','CO3.5','CR2-an','Martian (chassignite)','Eucrite-mmict','LL3-6','EH7-an','Unknown','L3-6','L5-6','H6','Iron, IVA','EH5','LL3.3','Ureilite-an','H5/6','H4-an','R3.8-6','CO3.4','OC','H3.7','L/LL6','Iron?','H3-6','H3-5','L/LL5','CR2','Iron','Ureilite','H4-5','Martian (nakhlite)','Iron, IIE-an','Achondrite-ung','L4-6','H3-4','Iron, IIF','Lodranite','L3','L3.7','H4','LL4','Mesosiderite-A1','H5','H5-6','C2-ung','L4','L6','H3.8','Iron, IIE','Acapulcoite','Mesosiderite','Iron, IAB-sLL','LL3.9','Eucrite-pmict','EH3/4-an','H','LL3.8','CK4','L3-4','LL3.15','Iron, IAB-MG','K3','CO3.3','H/L4','L5/6','Pallasite','CO3.2','H3','Winonaite','Aubrite','LL3.6','LL6','H/L3.6','L/LL4','CO3.6','L','L3.4','H5-7','LL3.00','EH3','Diogenite-pm','CBa','LL','H4/5','EH4','Diogenite','H?','Iron, ungrouped','H3.4','L3.7-6','LL3.4','C','Unknown']),
    check('mass', 'mass field is required').not().isEmpty(),
    check('mass', 'mass value has to be decimal').isDecimal(),
    check('fall', 'fall field is required').not().isEmpty(),
    check('fall', 'fall value is not valid. Value has to be: Fell, Found or Unknown').isIn(['Fell', 'Found', 'Unknown']),
    check('year', 'year field is required').not().isEmpty(),
    check('year', 'year value has to be date format (YYYY-MM-DD)').isDate(),
    check('reclat', 'reclat field is required').not().isEmpty(),
    check('reclat', 'reclat value has to be decimal').isDecimal(),
    check('reclong', 'reclong field is required').not().isEmpty(),
    check('reclong', 'reclong value has to be decimal').isDecimal(),
    validateFields
], createLanding );

// Update landing by id - Private: Users or Admin
router.put('/:id', [
    validateJwt,
    check('id', 'ID is not valid Mongo Id').isMongoId(),
    check('id').custom( checkLandIdMongoExists ),
    check('nametype', 'nametype field is required').not().isEmpty(),
    check('nametype', 'nametype value is not valid. Value has to be: Valid').isIn(['Valid']),
    check('recclass', 'recclass field is required').not().isEmpty(),
    check('recclass', 'recclass value is not valid. Value has to be: CV3, H/L3.9, Mesosiderite-A3/4, LL3.2, Howardite, Eucrite, CI1, H3/4, Eucrite-br, C3-ung, H4-6, EL6, "Iron, IIIAB", Stone-uncl, "Iron, IAB-ung", Mesosiderite-A3, Martian (shergottite), "Iron, IID", "Iron, IIAB", LL5, L3.6, L5, CM2, "Iron, IAB-sHL", Angrite, "Pallasite, PMG", Eucrite-cm, CO3.5, CR2-an, Martian (chassignite), Eucrite-mmict, LL3-6, EH7-an, L3-6, L5-6, H6, "Iron, IVA", EH5, LL3.3, Ureilite-an, H5/6, H4-an, R3.8-6, CO3.4, OC, H3.7, L/LL6, Iron?, H3-6, H3-5, L/LL5, CR2, Iron, Ureilite, H4-5, Martian (nakhlite), "Iron, IIE-an", Achondrite-ung, L4-6, H3-4, "Iron, IIF", Lodranite, L3, L3.7, H4, LL4, Mesosiderite-A1, H5, H5-6, C2-ung, L4, L6, H3.8, "Iron, IIE", Acapulcoite, Mesosiderite, "Iron, IAB-sLL", LL3.9, Eucrite-pmict, EH3/4-an, H, LL3.8, CK4, L3-4, LL3.15, "Iron, IAB-MG", K3, CO3.3, H/L4, L5/6, Pallasite, CO3.2, H3, Winonaite, Aubrite, LL3.6, LL6, H/L3.6, L/LL4, CO3.6, L, L3.4, H5-7, LL3.00, EH3, Diogenite-pm, CBa, LL, H4/5, EH4, Diogenite, H?, "Iron, ungrouped", H3.4, L3.7-6, LL3.4, C or Unknow').isIn(['CV3','H/L3.9','Mesosiderite-A3/4','LL3.2','Howardite','Eucrite','CI1','H3/4','Eucrite-br','C3-ung','H4-6','EL6','Iron, IIIAB','Stone-uncl','Iron, IAB-ung','Mesosiderite-A3','Martian (shergottite)','Iron, IID','Iron, IIAB','LL5','L3.6','L5','CM2','Iron, IAB-sHL','Angrite','Pallasite, PMG','Eucrite-cm','CO3.5','CR2-an','Martian (chassignite)','Eucrite-mmict','LL3-6','EH7-an','Unknown','L3-6','L5-6','H6','Iron, IVA','EH5','LL3.3','Ureilite-an','H5/6','H4-an','R3.8-6','CO3.4','OC','H3.7','L/LL6','Iron?','H3-6','H3-5','L/LL5','CR2','Iron','Ureilite','H4-5','Martian (nakhlite)','Iron, IIE-an','Achondrite-ung','L4-6','H3-4','Iron, IIF','Lodranite','L3','L3.7','H4','LL4','Mesosiderite-A1','H5','H5-6','C2-ung','L4','L6','H3.8','Iron, IIE','Acapulcoite','Mesosiderite','Iron, IAB-sLL','LL3.9','Eucrite-pmict','EH3/4-an','H','LL3.8','CK4','L3-4','LL3.15','Iron, IAB-MG','K3','CO3.3','H/L4','L5/6','Pallasite','CO3.2','H3','Winonaite','Aubrite','LL3.6','LL6','H/L3.6','L/LL4','CO3.6','L','L3.4','H5-7','LL3.00','EH3','Diogenite-pm','CBa','LL','H4/5','EH4','Diogenite','H?','Iron, ungrouped','H3.4','L3.7-6','LL3.4','C','Unknown']),
    check('mass', 'mass field is required').not().isEmpty(),
    check('mass', 'mass value has to be decimal').isDecimal(),
    check('fall', 'fall field is required').not().isEmpty(),
    check('fall', 'fall value is not valid. Value has to be: Fell, Found or Unknown').isIn(['Fell', 'Found', 'Unknown']),
    check('year', 'year field is required').not().isEmpty(),
    check('year', 'year value has to be date format (YYYY-MM-DD)').isDate(),
    check('reclat', 'reclat field is required').not().isEmpty(),
    check('reclat', 'reclat value has to be decimal').isDecimal(),
    check('reclong', 'reclong field is required').not().isEmpty(),
    check('reclong', 'reclong value has to be decimal').isDecimal(),
    validateFields
], updateLanding );


// Delete landing by id - Private: Admin
router.delete('/:id', [
    validateJwt,
    validateRoles('ADMIN_ROLE'),
    check('id', 'Is not valid ID').isMongoId(),
    check('id').custom( checkLandIdMongoExists ),
    validateFields
], deleteLanding );


module.exports = router;