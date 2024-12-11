const express = require('express');
require('dotenv').config();

const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send('File upload service is running!');
});

const tableCreator = require('./handlers/table.handler');
//tableCreator.dropTable(db);
tableCreator.createTable();

const historyRouter = require('./History/router');
app.use('/history', historyRouter);

const teamRouter = require('./Team/router');
app.use('/team', teamRouter);

const matchRouter = require('./Match/router');
app.use('/match', matchRouter);

const playerRouter = require('./Player/router');
app.use('/player', playerRouter);

const actionRouter = require('./Action/router');
app.use('/action', actionRouter);

// start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});