const actionTable = {
    'ID': {
        'type': 'INTEGER',
        'primaryKey': true
    },
    'name': {
        'type': 'TEXT',
        'notNull': true
    },
    'logo': {
        'type': 'TEXT',
        'notNull': false
    },
    'hasPlayer1': {
        'type': 'INTEGER',
        'notNull': true
    },
    'hasPlayer2': {
        'type': 'INTEGER',
        'notNull': true
    },
    'hasArea': {
        'type': 'INTEGER',
        'notNull': true
    }
}

module.exports = actionTable;