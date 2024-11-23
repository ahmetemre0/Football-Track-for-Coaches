const areaTable = {
    'ID': {
        'type': 'INTEGER',
        'primaryKey': true
    },
    'topLeftX': {
        'type': 'INTEGER',
        'notNull': true
    },
    'topLeftY': {
        'type': 'INTEGER',
        'notNull': true
    },
    'topRightX': {
        'type': 'INTEGER',
        'notNull': true
    },
    'topRightY': {
        'type': 'INTEGER',
        'notNull': true
    },
    'bottomLeftX': {
        'type': 'INTEGER',
        'notNull': true
    },
    'bottomLeftY': {
        'type': 'INTEGER',
        'notNull': true
    },
    'bottomRightX': {
        'type': 'INTEGER',
        'notNull': true
    },
    'bottomRightY': {
        'type': 'INTEGER',
        'notNull': true
    }
}

module.exports = areaTable;