const Match = require('../handlers/match.handler');

exports.getMatches = (req, res) => {
    if (req.query.id) {
        let match = Match.getByID(req.query.id);
        res.json({match: match, success: true});
        return
    }
    let matches = Match.getAll();
    res.json({matches: matches, success: true});
}