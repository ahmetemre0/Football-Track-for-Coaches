const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

exports.getByID = (id) => {
    let query = `SELECT * FROM action WHERE ID = ${id}`;
    db.get(query, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        return row;
    });    
}

exports.getAll = () => {
    let query = `SELECT * FROM action`;
    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        return rows;
    });
}

exports.insert = (name, logo, hasDoneTeamSide, hasAffectedTeamSide, hasByPlayer, hasToPlayer) => {
    let query = `INSERT INTO action (name, logo, hasDoneTeamSide, hasAffectedTeamSide, hasByPlayer, hasToPlayer) VALUES ('${name}', '${logo}', ${hasDoneTeamSide}, ${hasAffectedTeamSide}, ${hasByPlayer}, ${hasToPlayer})`;
    db.run(query, (err) => {
        if (err) {
            console.error(err.message);
        }
    });
}

exports.addLogo = (id, logo) => {
    let query = `UPDATE action SET logo = '${logo}' WHERE ID = ${id}`;
    db.run(query, (err) => {
        if (err) {
            console.error(err.message);
        }
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
    db.run(query, (err) => {
        if (err) {
            console.error(err.message);
        }
    });
}