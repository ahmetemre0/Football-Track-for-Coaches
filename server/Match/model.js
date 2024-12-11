const matchTable = {
    'ID': {
        'type': 'INTEGER',
        'primaryKey': true
    },
    'homeTeamID': {
        'type': 'INTEGER',
        'notNull': true
    },
    'awayTeamID': {
        'type': 'INTEGER',
        'notNull': true
    },
    'homeScore': {
        'type': 'INTEGER',
        'notNull': false
    },
    'awayScore': {
        'type': 'INTEGER',
        'notNull': false
    },
    'date': {
        'type': 'TEXT',
        'notNull': true
    }
}

module.exports = matchTable;