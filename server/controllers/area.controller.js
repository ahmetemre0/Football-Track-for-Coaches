const Area = require('../handlers/area.handler');

exports.getAll = (req, res) => {
    if (req.query.id) {
        let area = Area.getByID(req.query.id);
        res.json(area);
        return
    }
    let areas = Area.getAll();
    res.json(areas);
}

