const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

exports.getByID = (id) => {
    let query = `SELECT * FROM team WHERE ID = ${id}`;
    return new Promise((resolve, reject) => {
        db.get(query, (err, row) => {
            if (err) {
                console.error(err.message);
                reject(err); // Reject the promise on error
            } else {
                resolve(row); // Resolve the promise with the row
            }
        });
    });    
}

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM team`;
        db.all(query, (err, rows) => {
            if (err) {
                console.error(err.message);
                reject(err); // Reject the promise on error
            } else {
                resolve(rows); // Resolve the promise with the rows
            }
        });
    });
};


exports.insert = (name, logo) => {
    let query = `INSERT INTO team (name, logo) VALUES ('${name}', '${logo}')`;
    return new Promise((resolve, reject) => {
        db.run(query, (err) => {
            if (err) {
                console.error(err.message);
                reject(err); // Reject the promise on error
            } else {
                resolve(); // Resolve the promise
            }
        });
    });
}

exports.delete = (id) => {
    let query = `DELETE FROM team WHERE ID = ${id}`;
    return new Promise((resolve, reject) =>
        db.run(query, (err) => {
            if (err) {
                console.error(err.message);
                reject(err); // Reject the promise on error
            } else {
                resolve(); // Resolve the promise
            }
        })
    );
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
    return new Promise((resolve, reject) =>
        db.run(query, (err) => {
            if (err) {
                console.error(err.message);
                reject(err); // Reject the promise on error
            } else {
                resolve(); // Resolve the promise
            }
        })
    );
}