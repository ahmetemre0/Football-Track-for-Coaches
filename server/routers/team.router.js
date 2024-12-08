const teamRouter = require('express').Router();
const teamController = require('../controllers/team.controller');

teamRouter.get('/', teamController.getTeams);
teamRouter.get('/names', teamController.getNames);
teamRouter.get('/:id', teamController.getTeam);
teamRouter.get('/:id/players', teamController.getPlayers);
teamRouter.get('/:teamid/:matchid/squad', teamController.getSquad);
teamRouter.get('/:teamid/:matchid/first11', teamController.getFirst11);
teamRouter.get('/:teamid/:matchid/current11', teamController.getCurrent11);

teamRouter.post('/', teamController.createTeam);

teamRouter.put('/:id', teamController.updateTeam);

teamRouter.delete('/:id', teamController.deleteTeam);

module.exports = teamRouter;