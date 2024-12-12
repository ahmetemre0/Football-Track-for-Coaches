const Action = require('../Action/handler');
const History = require('./handler');
const Team = require('../Team/handler');
const Match = require('../Match/handler');
const Player = require('../Player/handler');
const Comp = require('../Comp/handler');

exports.getAll = async (req, res) => {
    try {
        let histories = await History.getAll();
        res.json({ histories: histories, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching histories', success: false });
    }
}

exports.getByMatchID = async (req, res) => {
    try {
        if (!req.params.matchid) {
            res.status(400).json({ message: 'Match ID is required', success: false });
            return;
        }
        let histories = await History.getByMatchID(req.params.matchid);

        if (!histories) {
            res.status(404).json({ message: 'History not found', success: false });
            return;
        }
        res.json({ histories: histories, success: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching history', success: false });
    }
}

exports.createHistory = async (req, res) => {
    try {
        if (!req.params.matchid) {
            res.status(400).json({ message: 'Match ID is required', success: false });
            return;
        }
        let match = await Match.getByID(req.params.matchid);
        if (!match) {
            res.status(404).json({ message: 'Match not found', success: false });
            return;
        }
        if (!req.body.actionTypeID) {
            res.status(400).json({ message: 'Action ID is required', success: false });
            return;
        }
        let action = await Action.getByID(req.body.actionTypeID);
        if (!action) {
            res.status(404).json({ message: 'Action not found', success: false });
            return;
        }
        if (!req.body.minutes || req.body.minutes < 0) {
            res.status(400).json({ message: 'Minutes is required and must be greater than 0', success: false });
            return;
        }
        if (!req.body.seconds || req.body.seconds < 0 || req.body.seconds > 59) {
            res.status(400).json({ message: 'Seconds is required and must be between 0 and 59', success: false });
            return;
        }
        if (action.hasPlayer1 && !req.body.actionPlayer1ID) {
            res.status(400).json({ message: 'Player ID is required', success: false });
            return;
        }
        if (action.hasPlayer2 && !req.body.actionPlayer2ID) {
            res.status(400).json({ message: 'Player ID is required', success: false });
            return;
        }
        if (action.hasArea && !req.body.actionPointX && !req.body.actionPointY) {
            res.status(400).json({ message: 'Point is required', success: false });
            return;
        }
        let team = null;
        let player1 = null;
        let player2 = null;
        let actionPointX = null;
        let actionPointY = null;
        if (req.body.actionTeamID) {
            team = await Team.getByID(req.body.actionTeamID);
            if (!team) {
                res.status(404).json({ message: 'Team not found', success: false });
                return;
            }
            team = req.body.actionTeamID;
        }
        if (action.hasPlayer1) {
            player1 = await Player.getByID(req.body.actionPlayer1ID);
            if (!player1) {
                res.status(404).json({ message: 'Player not found', success: false });
                return;
            }
            player1 = req.body.actionPlayer1ID;
        }
        if (action.hasPlayer2) {
            player2 = await Player.getByID(req.body.actionPlayer2ID);
            if (!player2) {
                res.status(404).json({ message: 'Player not found', success: false });
                return;
            }
            player2 = req.body.actionPlayer2ID;
        }
        if (action.hasArea) {
            actionPointX = req.body.actionPointX;
            actionPointY = req.body.actionPointY;
        }
        console.log(req.body.actionTypeID, team, player1, player2, req.body.minutes, req.body.seconds, actionPointX, actionPointY);
        let ID = await History.insert(req.params.matchid, req.body.actionTypeID, team, player1, player2, req.body.minutes, req.body.seconds, actionPointX, actionPointY);

        if (req.body.actionTypeID == 2) {
            await Match.updateScore(req.params.matchid, req.body.actionTeamID);
        }

        if (req.body.actionTypeID == 13) {
            await Comp.substitute(req.params.matchid, req.body.actionTeamID, req.body.actionPlayer1ID, req.body.actionPlayer2ID);
        }

        let history = await History.getByID(ID);
        res.json({
            message: 'History successfully created',
            success: true,
            history: history
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating history', success: false });
    }
}

exports.deleteHistory = async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(400).json({ message: 'History ID is required', success: false });
            return;
        }
        await History.delete(req.params.id);
        res.json({ message: 'History successfully deleted', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting history', success: false });
    }
}

exports.updateHistory = async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(400).json({ message: 'History ID is required', success: false });
            return;
        }
        let history = await History.getByID(req.params.id);
        if (!history) {
            res.status(404).json({ message: 'History not found', success: false });
            return;
        }
        if (req.body.minutes && req.body.minutes < 0) {
            res.status(400).json({ message: 'Minutes must be greater than 0', success: false });
            return;
        }
        if (req.body.seconds && (req.body.seconds < 0 || req.body.seconds > 59)) {
            res.status(400).json({ message: 'Seconds must be between 0 and 59', success: false });
            return;
        }

        let action = await Action.getByID(history.actionTypeID);
        let player1 = null;
        let player2 = null;
        let actionPointX = null;
        let actionPointY = null;
        if (action.hasPlayer1 && req.body.actionPlayer1ID) {
            player1 = await Player.getByID(req.body.actionPlayer1ID);
            if (!player1) {
                res.status(404).json({ message: 'Player not found', success: false });
                return;
            }
        }
        else if (action.hasPlayer1 && !req.body.actionPlayer1ID) {
            player1 = await Player.getByID(history.actionPlayer1ID);
        }

        if (action.hasPlayer2 && req.body.actionPlayer2ID) {
            let player2 = await Player.getByID(req.body.actionPlayer2ID);
            if (!player2) {
                res.status(404).json({ message: 'Player not found', success: false });
                return;
            }
        }
        else if (action.hasPlayer2 && !req.body.actionPlayer2ID) {
            player2 = await Player.getByID(history.actionPlayer2ID);
        }

        if (action.hasArea && req.body.actionPointX && req.body.actionPointY) {
            actionPointX = req.body.actionPointX;
            actionPointY = req.body.actionPointY;
        }
        else if (action.hasArea && (!req.body.actionPointX || !req.body.actionPointY)) {
            actionPointX = history.actionPointX;
            actionPointY = history.actionPointY;
        }

        await History.update(req.params.id, req.body.minutes, req.body.seconds, req.body.actionPlayer1ID, req.body.actionPlayer2ID, actionPointX, actionPointY);

        let updatedHistory = await History.getByID(req.params.id);

        res.json({ message: 'History successfully updated', success: true, history: updatedHistory });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating history', success: false });
    }
}