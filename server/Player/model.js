const playerTable = {
    'ID': {
        'type': 'INTEGER',
        'primaryKey': true
    },
    'name': {
        'type': 'TEXT',
        'notNull': true
    },
    'teamID': {
        'type': 'INTEGER',
        'notNull': true
    },
    'number': {
        'type': 'INTEGER',
        'notNull': true
    },
    'position': {
        'type': 'TEXT',
        'notNull': true
    },
    'photoPath': {
        'type': 'TEXT',
        'notNull': false
    }
}

module.exports = playerTable;