const Action = require('../handlers/action.handler');

exports.getAll = (req, res) => {
    if (req.query.id) {
        let action = Action.getByID(req.query.id);
        res.json(action);
        return
    }
    let actions = Action.getAll();
    res.json(actions);
}