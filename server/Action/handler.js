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

exports.insert = (name, logo, hasPlayer1, hasPlayer2, hasArea) => {
    let query = `INSERT INTO action (name, logo, hasPlayer1, hasPlayer2, hasArea) VALUES ('${name}', '${logo}', ${hasPlayer1}, ${hasPlayer2}, ${hasArea})`;
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


exports.update = (id, name, logo, hasPlayer1, hasPlayer2, hasArea) => {
    let query = `UPDATE action SET `;
    if (name) {
        query += `name = '${name}', `;
    }
    if (logo) {
        query += `logo = '${logo}', `;
    }
    if (hasPlayer1) {
        query += `hasPlayer1 = ${hasPlayer1}, `;
    }
    if (hasPlayer2) {
        query += `hasPlayer2 = ${hasPlayer2}, `;
    }
    if (hasArea) {
        query += `hasArea = ${hasArea}, `;
    }
    query = query.slice(0, -2);
    query += ` WHERE ID = ${id}`;
    return new Promise((resolve, reject) => {
        db.run(query, (err) => {
            if (err) {
                console.error(err.message);
                reject(err);
            }
            resolve();
        });
    });
}

exports.delete = (id) => {
    let query = `DELETE FROM action WHERE ID = ${id}`;
    return new Promise((resolve, reject) => {
        db.run(query, (err) => {
            if (err) {
                console.error(err.message);
                reject(err);
            }
            resolve();
        });
    });
}

exports.getAreaActions = () => {
    let query = `SELECT * FROM action WHERE hasArea = 1`;
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

exports.getNoAreaActions = () => {
    let query = `SELECT * FROM action WHERE hasArea = 0`;
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