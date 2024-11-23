const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

exports.getAll = () => {
    let query = `SELECT * FROM area`;
    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        return rows;
    });
}

exports.getByID = (id) => {
    let query = `SELECT * FROM area WHERE ID = ${id}`;
    db.get(query, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        return row;
    });
}