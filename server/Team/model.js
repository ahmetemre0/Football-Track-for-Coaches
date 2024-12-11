const teamTable = {
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
    }
}

module.exports = teamTable;