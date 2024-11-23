const teamRouter = require('express').Router();
const teamController = require('../controllers/team.controller');

teamRouter.get('/', teamController.getTeams);
teamRouter.post('/', teamController.createTeam);
teamRouter.delete('/', teamController.deleteTeam);
teamRouter.put('/', teamController.updateTeam);

module.exports = teamRouter;