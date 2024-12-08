const playerController = require('../controllers/player.controller');
const playerRouter = require('express').Router();

playerRouter.get('/', playerController.getPlayers);
playerRouter.get('/:id', playerController.getPlayer);

playerRouter.post('/', playerController.createPlayer);
playerRouter.delete('/:id', playerController.deletePlayer);
playerRouter.put('/:id', playerController.updatePlayer);

module.exports = playerRouter;