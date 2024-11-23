require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

const tableCreator = require('./handlers/table.handler');
//tableCreator.dropTable(db);
tableCreator.createTable(db);

const historyRouter = require('./routers/history.router');
app.use('/history', historyRouter);

const teamRouter = require('./routers/team.router');
app.use('/team', teamRouter);

const matchRouter = require('./routers/match.router');
app.use('/match', matchRouter);

const playerRouter = require('./routers/player.router');
app.use('/player', playerRouter);

const areaRouter = require('./routers/area.router');
app.use('/area', areaRouter);

const actionRouter = require('./routers/action.router');
app.use('/action', actionRouter);

// start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});