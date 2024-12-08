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

exports.insert = (name, logo, hasDoneTeamSide, hasAffectedTeamSide, hasByPlayer, hasToPlayer) => {
    let query = `INSERT INTO action (name, logo, hasDoneTeamSide, hasAffectedTeamSide, hasByPlayer, hasToPlayer) VALUES ('${name}', '${logo}', ${hasDoneTeamSide}, ${hasAffectedTeamSide}, ${hasByPlayer}, ${hasToPlayer})`;
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

exports.addLogo = (id, logo) => {
    let query = `UPDATE action SET logo = '${logo}' WHERE ID = ${id}`;
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

exports.update = (id, name, logo, hasDoneTeamSide, hasAffectedTeamSide, hasByPlayer, hasToPlayer) => {
    let query = `UPDATE action SET `;
    if (name) {
        query += `name = '${name}', `;
    }
    if (logo) {
        query += `logo = '${logo}', `;
    }
    if (hasDoneTeamSide) {
        query += `hasDoneTeamSide = ${hasDoneTeamSide}, `;
    }
    if (hasAffectedTeamSide) {
        query += `hasAffectedTeamSide = ${hasAffectedTeamSide}, `;
    }
    if (hasByPlayer) {
        query += `hasByPlayer = ${hasByPlayer}, `;
    }
    if (hasToPlayer) {
        query += `hasToPlayer = ${hasToPlayer}, `;
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