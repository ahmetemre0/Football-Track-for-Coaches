const matchRouter = require('express').Router();
const matchController = require('../controllers/match.controller');

matchRouter.get('/', matchController.getMatches);

module.exports = matchRouter;