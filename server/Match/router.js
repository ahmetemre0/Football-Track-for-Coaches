const matchRouter = require('express').Router();
const matchController = require('./controller');

matchRouter.get('/', matchController.getMatches);
matchRouter.get('/:teamid', matchController.getMatchesByTeam);
matchRouter.get('/:teamid/played', matchController.getPlayedMatches);
matchRouter.get('/:teamid/upcoming', matchController.getUpcomingMatches);
matchRouter.get('/:teamid/last', matchController.getLastMatch);
matchRouter.get('/:teamid/next', matchController.getNextMatch);
matchRouter.get('/:teamid/:opponentid', matchController.getMatchesByTeams);

matchRouter.post('/', matchController.createMatch);

matchRouter.put('/:id', matchController.updateMatch);

matchRouter.delete('/:id', matchController.deleteMatch);

module.exports = matchRouter;