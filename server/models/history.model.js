const historyTable = {
    'ID': {
        'type': 'INTEGER',
        'primaryKey': true
    },
    'matchID': {
        'type': 'INTEGER',
        'notNull': true
    },
    'minutes': {
        'type': 'INTEGER',
        'notNull': true
    },
    'seconds': {
        'type': 'INTEGER',
        'notNull': true
    },
    'actionTypeID': {
        'type': 'INTEGER',
        'notNull': true
    },
    'actionTeamID': {
        'type': 'INTEGER',
        'notNull': false
    },
    'actionPlayer1ID': {
        'type': 'INTEGER',
        'notNull': false
    },
    'actionPlayer2ID': {
        'type': 'INTEGER',
        'notNull': false
    },
    'actionAreaID': {
        'type': 'INTEGER',
        'notNull': false
    }
        
}

const sortByTimeForMatch = (matchID) => {
    return `SELECT * FROM history WHERE matchID = ${matchID} ORDER BY minutes, seconds`;
}



module.exports = historyTable;