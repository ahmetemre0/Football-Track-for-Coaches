const actionController = require('./controller');
const router = require('express').Router();

router.get('/', actionController.getAll);
router.get('/area', actionController.getAreaActions);
router.get('/no-area', actionController.getNoAreaActions);
router.get('/:id', actionController.getByID);
router.post('/', actionController.insert);
router.put('/:id', actionController.update);
router.delete('/:id', actionController.delete);

module.exports = router;