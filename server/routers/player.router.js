const playerController = require('../controllers/player.controller');
const playerRouter = require('express').Router();

playerRouter.get('/', playerController.getPlayers);
playerRouter.get('/:id', playerController.getPlayer);

playerRouter.post('/', playerController.createPlayer);
playerRouter.delete('/', playerController.deletePlayer);
playerRouter.put('/', playerController.updatePlayer);

module.exports = playerRouter;