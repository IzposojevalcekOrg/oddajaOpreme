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


/*
 * ADD POSTING
 */
router.post('/', leasingController.create);

/*
 * BORROW/RETURN
 */
router.put('/borrow/:id', leasingController.borrow);
router.put('/return/:id', leasingController.return);

/*
 * REMOVE POSTING
 */
router.delete('/:id', leasingController.remove);


module.exports = router;