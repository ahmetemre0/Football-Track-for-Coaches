const historyController = require('../controllers/history.controller');
const historyRouter = require('express').Router();

historyRouter.get('/', historyController.getAll);
historyRouter.get('/:matchid', historyController.getByMatchID);

historyRouter.post('/:matchid', historyController.createHistory);

historyRouter.put('/:id', historyController.updateHistory);

historyRouter.delete('/:id', historyController.deleteHistory);

module.exports = historyRouter;