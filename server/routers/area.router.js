const areaController = require('../controllers/area.controller');
const router = require('express').Router();

router.get('/', areaController.getAll);

module.exports = router;