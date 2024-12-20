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

exports.getSquad = async (teamID, matchID) => {
    let query = `
        SELECT p.ID, p.name, p.number, p.photoPath,
        c.isFirstEleven, c.inMatch
        FROM comp c
        JOIN player p ON c.playerID = p.ID
        WHERE c.teamID = ${teamID} AND c.matchID = ${matchID}
    `;
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

exports.getFirstEleven = (matchID, teamID) => {
    let query = `SELECT
        p.ID, p.name, p.number, p.photoPath,
        c.isFirstEleven, c.inMatch
        FROM comp c
        JOIN player p ON c.playerID = p.ID
        WHERE c.teamID = ${teamID} AND c.matchID = ${matchID} AND c.isFirstEleven = 1`;
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

exports.getCurrent11 = (matchID, teamID) => {
    let query = `SELECT 
        p.ID, p.name, p.number, p.photoPath,
        c.isFirstEleven, c.inMatch
        FROM comp c
        JOIN player p ON c.playerID = p.ID
        WHERE c.teamID = ${teamID} AND c.matchID = ${matchID} AND c.inMatch = 1`;
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

exports.insertMatch = async (matchID, homeTeamID, awayTeamID, homeTeamSquad, awayTeamSquad) => {
    for (let playerID of homeTeamSquad) {
        let isFirstEleven = 0;
        let inMatch = isFirstEleven;
        await this.insert(homeTeamID, matchID, playerID, isFirstEleven, inMatch);
    }
    for (let playerID of awayTeamSquad) {
        let isFirstEleven = 0;
        let inMatch = isFirstEleven;
        await this.insert(awayTeamID, matchID, playerID, isFirstEleven, inMatch);
    }
}

exports.updateMatch = async (matchID, homeTeamID, awayTeamID, homeTeamSquad, awayTeamSquad) => {
    let query = `DELETE FROM comp WHERE matchID = ${matchID}`;
    return new Promise((resolve, reject) => {
        db.run(query, async function (err) {
            if (err) {
                console.error(err.message);
                reject(err);
            }
            await this.insertMatch(matchID, homeTeamID, awayTeamID, homeTeamSquad, awayTeamSquad);
            resolve();
        });
    });
}

exports.createFirstEleven = async (matchID, teamID, firstEleven) => {
    let query = `UPDATE comp SET isFirstEleven = 1, inMatch = 1 WHERE teamID = ${teamID} AND matchID = ${matchID} AND playerID IN (${firstEleven.join()})`;
    console.log(query);
    return new Promise((resolve, reject) => {
            db.run(query, function (err) {
                if (err) {
                    console.error(err.message);
                    reject(err);
                }
            });
        resolve();
    });
}

exports.deleteMatch = async (matchID) => {
    let query = `DELETE FROM comp WHERE matchID = ${matchID}`;
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

exports.deleteFirstEleven = async (matchID, teamID) => {
    let query = `UPDATE comp SET isFirstEleven = 0, inMatch = 0 WHERE teamID = ${teamID} AND matchID = ${matchID}`;
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