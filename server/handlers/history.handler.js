const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

exports.getByID = (id) => {
    let query = `SELECT * FROM history WHERE ID = ${id}`;
    db.get(query, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        return row;
    });    
}

exports.getAll = () => {
    let query = `SELECT * FROM history`;
    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        return rows;
    });
}

exports.getByMatchID = (matchID) => {
    let query = `SELECT * FROM history WHERE matchID = ${match} ORDER BY minutes, seconds`;
    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        return rows;
    });
}

exports.insert = (matchID, minutes, seconds, actionTypeID, actionTeamID, actionPlayer1ID, actionPlayer2ID) => {
    // check if action type accepts player1 and player2 and according to this info write the query
    let query = `SELECT * FROM action WHERE ID = ${actionTypeID}`;

    db.get(query, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        if (row.hasPlayer1 && row.hasPlayer2) {
            query = `INSERT INTO history (matchID, minutes, seconds, actionTypeID, actionTeamID, actionPlayer1ID, actionPlayer2ID) VALUES (${matchID}, ${minutes}, ${seconds}, ${actionTypeID}, ${actionTeamID}, ${actionPlayer1ID}, ${actionPlayer2ID})`;
        } else if (row.hasPlayer1) {
            query = `INSERT INTO history (matchID, minutes, seconds, actionTypeID, actionTeamID, actionPlayer1ID) VALUES (${matchID}, ${minutes}, ${seconds}, ${actionTypeID}, ${actionTeamID}, ${actionPlayer1ID})`;
        }  else {
            query = `INSERT INTO history (matchID, minutes, seconds, actionTypeID, actionTeamID) VALUES (${matchID}, ${minutes}, ${seconds}, ${actionTypeID}, ${actionTeamID})`;
        }
    });
    db.run(query, (err) => {
        if (err) {
            console.error(err.message);
        }
    });
}
