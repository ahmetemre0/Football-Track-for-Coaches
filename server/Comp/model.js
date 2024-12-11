const compTable = {
    'ID': {
        'type': 'INTEGER',
        'primaryKey': true
    },
    'teamID': {
        'type': 'INTEGER',
        'notNull': true
    },
    'playerID': {
        'type': 'INTEGER',
        'notNull': true
    },
    'matchID': {
        'type': 'INTEGER',
        'notNull': true
    },
    'isFirstEleven': {
        'type': 'BOOLEAN',
        'notNull': true
    },
    'inMatch': {
        'type': 'BOOLEAN',
        'notNull': true
    }
}

module.exports = compTable;