const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

exports.getByID = (id) => {
    let query = `SELECT * FROM comp WHERE ID = ${id}`;
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

exports.getAll = () => {
    let query = `SELECT * FROM comp`;
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

exports.insert = async (teamID, matchID, playerID, isFirstEleven, inMatch) => {
    let query = `INSERT INTO comp (teamID, matchID, playerID, isFirstEleven, inMatch) VALUES (${teamID}, ${matchID}, ${playerID}, ${isFirstEleven}, ${inMatch})`;
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

exports.substitute = async (teamID, matchID, outPlayerID, inPlayerID) => {
    let outQuery = `UPDATE comp SET inMatch = 0 WHERE teamID = ${teamID} AND matchID = ${matchID} AND playerID = ${outPlayerID}`;
    let inQuery = `UPDATE comp SET inMatch = 1 WHERE teamID = ${teamID} AND matchID = ${matchID} AND playerID = ${inPlayerID}`;
    return new Promise((resolve, reject) => {
        db.run(outQuery, function (err) {
            if (err) {
                console.error(err.message);
                reject(err);
            }
            db.run(inQuery, function (err) {
                if (err) {
                    console.error(err.message);
                    reject(err);
                }
                resolve();
            });
        });
    });
}

exports.getSquad = (teamID, matchID) => {
    let query = `SELECT * FROM comp WHERE teamID = ${teamID} AND matchID = ${matchID}`;
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

exports.getFirstEleven = (teamID, matchID) => {
    let query = `SELECT * FROM comp WHERE teamID = ${teamID} AND matchID = ${matchID} AND isFirstEleven = 1`;
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

exports.getCurrent11 = (teamID, matchID) => {
    let query = `SELECT * FROM comp WHERE teamID = ${teamID} AND matchID = ${matchID} AND inMatch = 1`;
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