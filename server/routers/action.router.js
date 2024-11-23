const actionController = require('../controllers/action.controller');
const router = require('express').Router();

router.get('/', actionController.getAll);

module.exports = router;