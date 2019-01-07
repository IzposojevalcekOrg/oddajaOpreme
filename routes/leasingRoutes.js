let express = require('express');
let router = express.Router();
let leasingController = require('../controllers/leasingController.js');

/*
 * GET
 */
router.get('/', leasingController.list);

/*
 * GET
 */
router.get('/:id', leasingController.show);

router.post('/generateDummies', leasingController.generateDummies);
/*
 * POST
 */
router.post('/', leasingController.create);

/*
 * PUT
 */
router.put('/:id', leasingController.update);

/*
 * DELETE
 */
router.delete('/:id', leasingController.remove);


module.exports = router;