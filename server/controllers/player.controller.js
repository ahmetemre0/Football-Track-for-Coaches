const Player = require('../handlers/player.handler');

exports.getPlayers = (req, res) => {
    if (req.query.id) {
        let player = Player.getByID(req.query.id);
        res.json(player);
        return
    }
    let players = Player.getAll();
    res.json(players);
}