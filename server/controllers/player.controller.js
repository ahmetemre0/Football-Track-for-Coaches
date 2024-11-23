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

exports.createPlayer = (req, res) => {
    Player.insert(req.body.name, req.body.photoPath, req.body.teamID);
    res.json({ message: 'Player successfully created' });
}

exports.deletePlayer = (req, res) => {
    Player.delete(req.query.id);
    res.json({ message: 'Player successfully deleted' });
}

exports.updatePlayer = (req, res) => {
    Player.update(req.body.id, req.body.name, req.body.photoPath, req.body.teamID);
    res.json({ message: 'Player successfully updated' });
}