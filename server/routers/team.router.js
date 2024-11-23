const teamRouter = require('express').Router();
const teamController = require('../controllers/team.controller');

teamRouter.get('/', teamController.getTeams);
teamRouter.get('/:id', teamController.getTeam);
teamRouter.get('/names', teamController.getNames);
teamRouter.get('/players', teamController.getPlayers);

teamRouter.post('/', teamController.createTeam);

teamRouter.put('/:id', teamController.updateTeam);

teamRouter.delete('/:id', teamController.deleteTeam);

module.exports = teamRouter;