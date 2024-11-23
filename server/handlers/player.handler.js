const { photoPath } = require('../models/player.model');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

exports.getByID = (id) => {
    let query = `SELECT * FROM action WHERE ID = ${id}`;
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
    let query = `SELECT * FROM action`;
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

exports.insert = (name, photoPath, teamID, number, position) => {
    let query = `INSERT INTO player (name, photoPath, teamID, number, position) VALUES ('${name}', '${photoPath}', ${teamID}, ${number}, '${position}')`; 
    return new Promise((resolve, reject) =>
        db.run(query, (err) => {
            if (err) {
                console.error(err.message);
                reject(err);
            }
            resolve();
        })
    );
}

exports.addPhotoPath = (id, photoPath) => {
    let query = `UPDATE player SET photoPath = '${photoPath}' WHERE ID = ${id}`;
    return new Promise((resolve, reject) =>
        db.run(query, (err) => {
            if (err) {
                console.error(err.message);
                reject(err);
            }
            resolve();
        })
    );
}

exports.update = (id, name, photoPath, teamID, number, position) => {
    let query = `UPDATE player SET `;
    if (name) {
        query += `name = '${name}', `;
    }
    if (photoPath) {
        query += `photoPath = '${photoPath}', `;
    }
    if (teamID) {
        query += `teamID = ${teamID}, `;
    }
    if (number) {
        query += `number = ${number}, `;
    }
    if (position) {
        query += `position = '${position}', `;
    }
    query = query.slice(0, -2);
    query += ` WHERE ID = ${id}`;
    return new Promise((resolve, reject) =>
        db.run(query, (err) => {
            if (err) {
                console.error(err.message);
                reject(err);
            }
            resolve();
        })
    );
}

exports.delete = (id) => {
    let query = `DELETE FROM player WHERE ID = ${id}`;
    return new Promise((resolve, reject) =>
        db.run(query, (err) => {
            if (err) {
                console.error(err.message);
                reject(err);
            }
            resolve();
        })
    );
}

exports.getByTeamID = (teamID) => {
    let query = `SELECT player.ID, player.name, player.photoPath, player.number, player.position FROM player WHERE teamID = ${teamID} ORDER BY number`;
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

exports.getNumbersByTeamID = (teamID) => {
    let query = `SELECT number FROM player WHERE teamID = ${team} ORDER BY number`;
    return new Promise((resolve, reject) =>
        db.all(query, (err, rows) => {
            if (err) {
                console.error(err.message);
                reject(err);
            }
            resolve(rows.map(row => row.number));
        })
    );
}