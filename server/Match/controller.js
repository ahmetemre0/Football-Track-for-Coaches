const Match = require('./handler');
const Comp = require('../Comp/handler');

exports.getMatches = async (req, res) => {
    try {
        let matches = await Match.getAll();
        res.json({matches: matches, success: true});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching matches', success: false });
    }
}

exports.getMatch = async (req, res) => {
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
        if (!req.body.homeTeamID) {
            res.status(400).json({ message: 'Home Team is required', success: false });
            return;
        }
        if (!req.body.awayTeamID) {
            res.status(400).json({ message: 'Away Team is required', success: false });
            return;
        }
        let newMatchID = await Match.insert(req.body.homeTeamID, req.body.awayTeamID);
        const match = await Match.getByID(newMatchID);

        await Comp.insertMatch(newMatchID, req.body.homeTeamID, req.body.awayTeamID, req.body.homeTeamSquad, req.body.awayTeamSquad);

        res.json({
            message: 'Match successfully created',
            success: true,
            match: match
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
        await Match.update(req.params.id, req.body.homeTeamID, req.body.awayTeamID, req.body.homeScore, req.body.awayScore);

        await Comp.updateMatch(req.params.id, req.body.homeTeamID, req.body.awayTeamID, req.body.homeTeamSquad, req.body.awayTeamSquad);

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
        let matches = await Match.getByTeamID(req.params.teamid);
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
        let matches = await Match.getPlayedMatches(req.params.teamid);
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
        let matches = await Match.getUpcomingMatches(req.params.teamid);
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
        let match = await Match.getLastMatch(req.params.teamid);
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
        let match = await Match.getNextMatch(req.params.teamid);
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