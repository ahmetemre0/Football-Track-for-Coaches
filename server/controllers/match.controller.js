const Match = require('../handlers/match.handler');

exports.getMatches = (req, res) => {
    try {
        let matches = Match.getAll();
        res.json({matches: matches, success: true});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching matches', success: false });
    }
}

exports.getMatch = (req, res) => {
    try {
        if (!req.params.id) {
            res.status(400).json({ message: 'Match ID is required', success: false });
            return;
        }
        let match = Match.getByID(req.params.id);
        if (!match) {
            res.status(404).json({ message: 'Match not found', success: false });
            return;
        }
        res.json({match: match, success: true});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching match', success: false });
    }
}

exports.deleteMatch = async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(400).json({ message: 'Match ID is required', success: false });
            return;
        }
        await Match.delete(req.params.id);
        res.json({ message: 'Match successfully deleted', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting match', success: false });
    }
}

exports.createMatch = async (req, res) => {
    try {
        await Match.insert(req.body.homeTeamID, req.body.awayTeamID, req.body.date, req.body.homeScore, req.body.awayScore);
        res.json({
            message: 'Match successfully created',
            success: true,
            match: {
                homeTeamID: req.body.homeTeamID,
                awayTeamID: req.body.awayTeamID,
                date: req.body.date,
                homeScore: req.body.homeScore,
                awayScore: req.body.awayScore,
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating match', success: false });
    }
}

exports.updateMatch = async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(400).json({ message: 'Match ID is required', success: false });
            return;
        }
        let match = await Match.getByID(req.params.id);
        if (!match) {
            res.status(404).json({ message: 'Match not found', success: false });
            return;
        }
        await Match.update(req.params.id, req.body.homeTeamID, req.body.awayTeamID, req.body.date, req.body.homeScore, req.body.awayScore);
        res.json({ message: 'Match successfully updated', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating match', success: false });
    }
}

exports.getMatchesByTeam = async (req, res) => {
    try {
        if (!req.params.teamid) {
            res.status(400).json({ message: 'Team ID is required', success: false });
            return;
        }
        let matches = await Match.getByTeamID(req.params.id);
        res.json({matches: matches, success: true});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching matches', success: false });
    }
}

exports.getPlayedMatches = async (req, res) => {
    try {
        if (!req.params.teamid) {
            res.status(400).json({ message: 'Team ID is required', success: false });
            return;
        }
        let matches = await Match.getPlayedMatches(req.params.id);
        res.json({matches: matches, success: true});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching matches', success: false });
    }
}

exports.getUpcomingMatches = async (req, res) => {
    try {
        if (!req.params.teamid) {
            res.status(400).json({ message: 'Team ID is required', success: false });
            return;
        }
        let matches = await Match.getUpcomingMatches(req.params.id);
        res.json({matches: matches, success: true});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching matches', success: false });
    }
}

exports.getLastMatch = async (req, res) => {
    try {
        if (!req.params.teamid) {
            res.status(400).json({ message: 'Team ID is required', success: false });
            return;
        }
        let match = await Match.getLastMatch(req.params.id);
        if (!match) {
            res.status(404).json({ message: 'No previous match', success: false });
            return;
        }
        res.json({match: match, success: true});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching match', success: false });
    }
}

exports.getNextMatch = async (req, res) => {
    try {
        if (!req.params.teamid) {
            res.status(400).json({ message: 'Team ID is required', success: false });
            return;
        }
        let match = await Match.getNextMatch(req.params.id);
        if (!match) {
            res.status(404).json({ message: 'No upcoming match', success: false });
            return;
        }
        res.json({match: match, success: true});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching match', success: false });
    }
}

exports.getMatchesByTeams = async (req, res) => {
    try {
        if (!req.params.teamid) {
            res.status(400).json({ message: 'Team ID is required', success: false });
            return;
        }
        if (!req.params.opponentid) {
            res.status(400).json({ message: 'Opponent ID is required', success: false });
            return;
        }
        let matches = await Match.getByTeams(req.params.teamid, req.params.opponentid);
        res.json({matches: matches, success: true});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching matches', success: false });
    }
}