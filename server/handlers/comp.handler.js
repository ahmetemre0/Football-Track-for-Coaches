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