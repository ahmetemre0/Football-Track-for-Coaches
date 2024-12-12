const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

exports.getByID = async (id) => {
    let query = `SELECT * FROM history WHERE ID = ${id}`;
    return new Promise((resolve, reject) => {
        db.get(query, (err, row) => {
            if (err) {
                console.error(err.message);
                reject(err);
            }
            resolve(row);
        });
    });
}

exports.getAll = async () => {
    let query = `SELECT * FROM history`;
    return new Promise((resolve, reject) => {
        db.all(query, (err, rows) => {
            if (err) {
                console.error(err.message);
                reject(err);
            }
            resolve(rows);
        });
    });
}

exports.insert = async (matchID, actionTypeID, actionTeamID, actionPlayer1ID, actionPlayer2ID, minutes, seconds, actionPointX, actionPointY) => {
    let query = `INSERT INTO history (matchID, actionTypeID, actionTeamID, actionPlayer1ID, actionPlayer2ID, minutes, seconds, actionPointX, actionPointY) VALUES (${matchID}, ${actionTypeID}, ${actionTeamID}, ${actionPlayer1ID}, ${actionPlayer2ID}, ${minutes}, ${seconds}, ${actionPointX}, ${actionPointY})`;
    return new Promise((resolve, reject) => {
        db.run(query, function (err) {
            if (err) {
                console.error(err.message);
                reject(err);
            }
            resolve(this.lastID);
        });
    });
}

exports.getByMatchID = async (matchID) => {
    let query = `SELECT * FROM history WHERE matchID = ${matchID} ORDER BY minutes, seconds`;
    return new Promise((resolve, reject) => {
        db.all(query, (err, rows) => {
            if (err) {
                console.error(err.message);
                reject(err);
            }
            resolve(rows);
        });
    });
}

exports.delete = async (id) => {
    let query = `DELETE FROM history WHERE ID = ${id}`;
    return new Promise((resolve, reject) => {
        db.run(query, function (err) {
            if (err) {
                console.error(err.message);
                reject(err);
            }
            resolve();
        });
    });
}

exports.deleteMatch = async (matchID) => {
    let query = `DELETE FROM history WHERE matchID = ${matchID}`;
    return new Promise((resolve, reject) => {
        db.run(query, function (err) {
            if (err) {
                console.error(err.message);
                reject(err);
            }
            resolve();
        });
    });
}