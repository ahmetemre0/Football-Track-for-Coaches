const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

exports.getAll = () => {
    let query = `
        SELECT 
            match.ID AS matchID,
            match.homeTeamID,
            homeTeam.name AS homeTeamName,
            homeTeam.logo AS homeTeamLogo,
            match.awayTeamID,
            awayTeam.name AS awayTeamName,
            awayTeam.logo AS awayTeamLogo,
            match.homeScore,
            match.awayScore,
            match.date
        FROM 
            match
        LEFT JOIN 
            team AS homeTeam ON match.homeTeamID = homeTeam.ID
        LEFT JOIN 
            team AS awayTeam ON match.awayTeamID = awayTeam.ID
    `;
    return new Promise((resolve, reject) => {
        db.all(query, (err, rows) => {
            if (err) {
                console.error(err.message);
                reject(err); 
            } else {
                resolve(rows); 
            }
        });
    });
};

exports.getByID = (id) => {
    let query = `
        SELECT 
            match.ID AS matchID,
            match.homeTeamID,
            homeTeam.name AS homeTeamName,
            homeTeam.logo AS homeTeamLogo,
            match.awayTeamID,
            awayTeam.name AS awayTeamName,
            awayTeam.logo AS awayTeamLogo,
            match.homeScore,
            match.awayScore,
            match.date
        FROM 
            match
        JOIN 
            team AS homeTeam ON match.homeTeamID = homeTeam.ID
        JOIN 
            team AS awayTeam ON match.awayTeamID = awayTeam.ID
        WHERE
            match.ID = ?`;
    return new Promise((resolve, reject) => {

        db.get(query, [id], (err, rows) => {
            if (err) {
                console.error(err.message);
                reject(err); 
            } else {
                resolve(rows); 
            }
        });
    });
};

exports.insert = (homeTeamID, awayTeamID, homeScore, awayScore) => {
    let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    if (!homeScore) homeScore = 'NULL';
    if (!awayScore) awayScore = 'NULL';
    let query = `INSERT INTO match (homeTeamID, awayTeamID, homeScore, awayScore, date) VALUES (? , ? , ?,?, ?)`;
    return new Promise((resolve, reject) => {
        db.run(query, [homeTeamID, awayTeamID, homeScore, awayScore, date], function (err) {
            if (err) {
                console.error(err.message);
                reject(err); 
            } else {
                resolve(this.lastID); 
            }
        });
    });
};

exports.delete = (id) => {
    let query = `DELETE FROM match WHERE ID = ${id}`;
    return new Promise((resolve, reject) => {
        db.run(query, (err) => {
            if (err) {
                console.error(err.message);
                reject(err); 
            } else {
                resolve(); 
            }
        });
    });
};

exports.update = (id, homeTeamID, awayTeamID, homeScore, awayScore) => {
    if (!homeScore) homeScore = 'NULL';
    if (!awayScore) awayScore = 'NULL';
    date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let query = `UPDATE match SET `;
    if (homeTeamID) {
        query += `homeTeamID = ${homeTeamID}, `;
    }
    if (awayTeamID) {
        query += `awayTeamID = ${awayTeamID}, `;
    }
    if (date) {
        query += `date = '${date}', `;
    }
    if (homeScore) {
        query += `homeScore = ${homeScore}, `;
    }
    if (awayScore) {
        query += `awayScore = ${awayScore}, `;
    }
    query = query.slice(0, -2); // Remove the last comma
    query += ` WHERE ID = ${id}`;
    return new Promise((resolve, reject) => {
        db.run(query, (err) => {
            if (err) {
                console.error(err.message);
                reject(err); 
            } else {
                resolve(); 
            }
        });
    });
};

exports.getByTeamID = (teamID) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                match.ID AS matchID,
                match.homeTeamID,
                homeTeam.name AS homeTeamName,
                homeTeam.logo AS homeTeamLogo,
                match.awayTeamID,
                awayTeam.name AS awayTeamName,
                awayTeam.logo AS awayTeamLogo,
                match.homeScore,
                match.awayScore,
                match.date
            FROM 
                match
            JOIN 
                team AS homeTeam ON match.homeTeamID = homeTeam.ID
            JOIN 
                team AS awayTeam ON match.awayTeamID = awayTeam.ID
            WHERE
                match.homeTeamID = ${teamID} OR match.awayTeamID = ${teamID}
        `;
        db.all(query, (err, rows) => {
            if (err) {
                console.error(err.message);
                reject(err); 
            } else {
                resolve(rows); 
            }
        });
    });
}

exports.getPlayedMatches = (teamID) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                match.ID AS matchID,
                match.homeTeamID,
                homeTeam.name AS homeTeamName,
                homeTeam.logo AS homeTeamLogo,
                match.awayTeamID,
                awayTeam.name AS awayTeamName,
                awayTeam.logo AS awayTeamLogo,
                match.homeScore,
                match.awayScore,
                match.date
            FROM 
                match
            JOIN 
                team AS homeTeam ON match.homeTeamID = homeTeam.ID
            JOIN 
                team AS awayTeam ON match.awayTeamID = awayTeam.ID
            WHERE
                (match.homeTeamID = ${teamID} OR match.awayTeamID = ${teamID}) AND match.homeScore IS NOT NULL AND match.awayScore IS NOT NULL
        `;
        db.all(query, (err, rows) => {
            if (err) {
                console.error(err.message);
                reject(err); 
            } else {
                resolve(rows); 
            }
        });
    });
}

exports.getUpcomingMatches = (teamID) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                match.ID AS matchID,
                match.homeTeamID,
                homeTeam.name AS homeTeamName,
                homeTeam.logo AS homeTeamLogo,
                match.awayTeamID,
                awayTeam.name AS awayTeamName,
                awayTeam.logo AS awayTeamLogo,
                match.homeScore,
                match.awayScore,
                match.date
            FROM 
                match
            JOIN 
                team AS homeTeam ON match.homeTeamID = homeTeam.ID
            JOIN 
                team AS awayTeam ON match.awayTeamID = awayTeam.ID
            WHERE
                (match.homeTeamID = ${teamID} OR match.awayTeamID = ${teamID}) AND match.homeScore IS NULL AND match.awayScore IS NULL
        `;
        db.all(query, (err, rows) => {
            if (err) {
                console.error(err.message);
                reject(err); 
            } else {
                resolve(rows); 
            }
        });
    });
}

exports.getLastMatch = (teamID) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                match.ID AS matchID,
                match.homeTeamID,
                homeTeam.name AS homeTeamName,
                homeTeam.logo AS homeTeamLogo,
                match.awayTeamID,
                awayTeam.name AS awayTeamName,
                awayTeam.logo AS awayTeamLogo,
                match.homeScore,
                match.awayScore,
                match.date
            FROM 
                match
            JOIN 
                team AS homeTeam ON match.homeTeamID = homeTeam.ID
            JOIN 
                team AS awayTeam ON match.awayTeamID = awayTeam.ID
            WHERE
                (match.homeTeamID = ${teamID} OR match.awayTeamID = ${teamID}) AND match.homeScore IS NOT NULL AND match.awayScore IS NOT NULL
            ORDER BY
                match.date DESC
            LIMIT 1
        `;
        db.get(query, (err, row) => {
            if (err) {
                console.error(err.message);
                reject(err); 
            } else {
                resolve(row); 
            }
        });
    });
}

exports.getNextMatch = (teamID) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                match.ID AS matchID,
                match.homeTeamID,
                homeTeam.name AS homeTeamName,
                homeTeam.logo AS homeTeamLogo,
                match.awayTeamID,
                awayTeam.name AS awayTeamName,
                awayTeam.logo AS awayTeamLogo,
                match.homeScore,
                match.awayScore,
                match.date
            FROM 
                match
            JOIN 
                team AS homeTeam ON match.homeTeamID = homeTeam.ID
            JOIN 
                team AS awayTeam ON match.awayTeamID = awayTeam.ID
            WHERE
                (match.homeTeamID = ${teamID} OR match.awayTeamID = ${teamID}) AND match.homeScore IS NULL AND match.awayScore IS NULL
            ORDER BY
                match.date ASC
            LIMIT 1
        `;
        db.get(query, (err, row) => {
            if (err) {
                console.error(err.message);
                reject(err); 
            } else {
                resolve(row); 
            }
        });
    });
}

exports.getByTeams = (homeTeamID, awayTeamID) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                match.ID AS matchID,
                match.homeTeamID,
                homeTeam.name AS homeTeamName,
                homeTeam.logo AS homeTeamLogo,
                match.awayTeamID,
                awayTeam.name AS awayTeamName,
                awayTeam.logo AS awayTeamLogo,
                match.homeScore,
                match.awayScore,
                match.date
            FROM 
                match
            JOIN 
                team AS homeTeam ON match.homeTeamID = homeTeam.ID
            JOIN 
                team AS awayTeam ON match.awayTeamID = awayTeam.ID
            WHERE
                (match.homeTeamID = ${homeTeamID} AND match.awayTeamID = ${awayTeamID})
                OR
                (match.homeTeamID = ${awayTeamID} AND match.awayTeamID = ${homeTeamID})
        `;
        db.all(query, (err, row) => {
            if (err) {
                console.error(err.message);
                reject(err); 
            } else {
                resolve(row); 
            }
        });
    });
}

exports.getTeams = (matchID) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                homeTeamID,
                homeTeam.name AS homeTeamName,
                homeTeam.logo AS homeTeamLogo,
                awayTeamID,
                awayTeam.name AS awayTeamName,
                awayTeam.logo AS awayTeamLogo
            FROM 
                match
            JOIN 
                team AS homeTeam ON match.homeTeamID = homeTeam.ID
            JOIN 
                team AS awayTeam ON match.awayTeamID = awayTeam.ID
            WHERE
                match.ID = ${matchID}
        `;
        db.get(query, (err, row) => {
            if (err) {
                console.error(err.message);
                reject(err); 
            } else {
                resolve(row); 
            }
        });
    });
}