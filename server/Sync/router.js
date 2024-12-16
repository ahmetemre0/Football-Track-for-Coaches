const SyncController = require('./controller');
const SyncRouter = require('express').Router();

SyncRouter.get('/download/:databaseName', SyncController.download);
SyncRouter.post('/upload', SyncController.upload);

module.exports = SyncRouter;