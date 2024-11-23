const express = require('express');
require('dotenv').config();

const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

const tableCreator = require('./handlers/table.handler');
//tableCreator.dropTable(db);
tableCreator.createTable(db);

const historyRouter = require('./routers/history.router');
const teamRouter = require('./routers/team.router');
const matchRouter = require('./routers/match.router');
const playerRouter = require('./routers/player.router');
const areaRouter = require('./routers/area.router');
const actionRouter = require('./routers/action.router');

app.use('api/history', historyRouter);
app.use('api/team', teamRouter);
app.use('api/match', matchRouter);
app.use('api/player', playerRouter);
app.use('api/area', areaRouter);
app.use('api/action', actionRouter);





// start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});