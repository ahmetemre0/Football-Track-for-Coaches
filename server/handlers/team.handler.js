const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../db.sqlite');

exports.getByID = (id) => {
    let query = `SELECT * FROM team WHERE ID = ${id}`;
    db.get(query, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        return row;
    });    
}

exports.getAll = () => {
    let query = `SELECT * FROM team`;
    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        return rows;
    });
}

exports.insert = (name, photoPath) => {
    let query = `INSERT INTO team (name, photoPath) VALUES ('${name}', '${photoPath}')`;
    db.run(query, (err) => {
        if (err) {
            console.error(err.message);
        }
    });
}

exports.delete = (id) => {
    let query = `DELETE FROM team WHERE ID = ${id}`;
    db.run(query, (err) => {
        if (err) {
            console.error(err.message);
        }
    });
}

exports.update = (id, name, photoPath) => {
    // check if changed name or photoPath
    let query = `UPDATE team SET `;
    if (name) {
        query += `name = '${name}'`;
    }
    if (photoPath) {
        query += `, photoPath = '${photoPath}'`;
    }
    query += ` WHERE ID = ${id}`;
    db.run(query, (err) => {
        if (err) {
            console.error(err.message);
        }
    });
}