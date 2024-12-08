const historyTable = require('../models/history.model');
const actionTable = require('../models/action.model');
const teamTable = require('../models/team.model');
const matchTable = require('../models/match.model');
const playerTable = require('../models/player.model');
const compTable = require('../models/comp.model');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');


const getCreatorQuery = (tableName, table) => {
    let query = `CREATE TABLE IF NOT EXISTS ${tableName} (`;
    for (let column in table) {
        query += `${column} ${table[column].type}`;
        if (table[column].primaryKey) {
            query += ' PRIMARY KEY';
        }
        if (table[column].notNull) {
            query += ' NOT NULL';
        }
        query += ', ';
    }
    query = query.slice(0, -2);
    query += ')';
    return query;
}

const createTable = () => {
    db.serialize(() => {
        db.run(getCreatorQuery('history', historyTable));
        db.run(getCreatorQuery('action', actionTable));
        db.run(getCreatorQuery('team', teamTable));
        db.run(getCreatorQuery('match', matchTable));
        db.run(getCreatorQuery('player', playerTable));
        db.run(getCreatorQuery('comp', compTable));
    });
}

const dropTable = (db) => {
    db.serialize(() => {
        db.run('DROP TABLE IF EXISTS history');
        db.run('DROP TABLE IF EXISTS action');
        db.run('DROP TABLE IF EXISTS team');
        db.run('DROP TABLE IF EXISTS match');
        db.run('DROP TABLE IF EXISTS player');
        db.run('DROP TABLE IF EXISTS area');
        db.run('DROP TABLE IF EXISTS comp');
    });
}

module.exports = { createTable, dropTable };