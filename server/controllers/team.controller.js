const Team = require('../handlers/team.handler');
const Player = require('../handlers/player.handler');

exports.getTeams = (req, res) => {
    if (req.query.id) {
        let team = Team.getByID(req.query.id);
        res.json({team: team, players: Player.getByTeamID(req.query.id), success: true});
        return
    }
    let teams = Team.getAll();
    res.json({teams: teams, success: true});
}

exports.createTeam = (req, res) => {
    Team.insert(req.body.name, req.body.photoPath);
    res.json({ message: 'Team successfully created', success: true });
}

exports.deleteTeam = (req, res) => {
    Team.delete(req.query.id);
    res.json({ message: 'Team successfully deleted', success: true });
}

exports.updateTeam = (req, res) => {
    Team.update(req.body.id, req.body.name, req.body.photoPath);
    res.json({ message: 'Team successfully updated', success: true });
}