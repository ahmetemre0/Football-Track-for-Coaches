const Team = require('../handlers/team.handler');
const Player = require('../handlers/player.handler');
const Match = require('../handlers/match.handler');

const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Configure multer for file uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const dir = './uploads/logos';
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true }); // Ensure directory exists
            }
            cb(null, dir); // Save files in this directory
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
            cb(new Error('Only images are allowed'));
        } else {
            cb(null, true);
        }
    },
});

// Define the route with the file upload middleware
exports.createTeam = [
    upload.single('logo'), // Expect the logo file in the "logo" field, optional
    async (req, res) => {
        try {
            // Determine the logo path (optional)
            const logoPath = req.file ? path.join('/uploads/logos', req.file.filename) : path.join('/uploads/logos', 'logo.png');

            if (!req.body.name) {
                res.status(400).json({ message: 'Name is required', success: false });
                return;
            }

            // Insert into the database
            await Team.insert(req.body.name, logoPath);

            res.json({
                message: 'Team successfully created',
                success: true,
                team: {
                    name: req.body.name,
                    logo: logoPath || defaultLogo,
                },
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating team', success: false });
        }
    },
];


exports.getTeams = async (req, res) => {
    try {
        let teams = await Team.getAll();
        res.json({teams: teams, success: true});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching teams', success: false });
    }
}

exports.getTeam = async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(400).json({ message: 'Team ID is required', success: false });
            return;
        }
        let team = await Team.getByID(req.params.id);

        if (!team) {
            res.status(404).json({ message: 'Team not found', success: false });
            return;
        }
        res.json({team: team, success: true});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching team', success: false });
    }
}


exports.deleteTeam = async (req, res) => {
    try{
        if (!req.params.id) {
            res.status(400).json({ message: 'Team ID is required', success: false });
            return;
        }
        let team = await Team.getByID(req.params.id);
        if (!team) {
            res.status(404).json({ message: 'Team not found', success: false });
            return;
        }
        await Team.delete(req.params.id);
        res.json({ message: 'Team successfully deleted', success: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting team', success: false });
    }
}

exports.updateTeam = [
    upload.single('logo'), // Expect the logo file in the "logo" field, optional
    async (req, res) => {
        try {
            // Determine the logo path (optional)
            let logoPath = req.file ? path.join('/uploads/logos', req.file.filename) : path.join('/uploads/logos', 'logo.png');
            
            if (!req.params.id) {
                res.status(400).json({ message: 'Team ID is required', success: false });
                return;
            }
            // Update the database
            const oldTeam = await Team.getByID(req.params.id);

            if (!oldTeam) {
                res.status(404).json({ message: 'Team not found', success: false });
                return;
            }

            
            if (req.file) {
                // Delete the old logo if a new one was uploaded
                if (oldTeam.logo) {
                    fs.unlinkSync(path.join(__dirname, '..', 'uploads', oldTeam.logo));
                }
            }
            
            if (!req.body.name && !req.file) {
                res.status(400).json({ message: 'Nothing to update', success: false });
                return;
            }
            
            if (!req.body.name) {
                req.body.name = oldTeam.name;
            }
            
            if (!req.file) {
                logoPath = oldTeam.logo;
            }
            
            await Team.update(req.params.id, req.body.name, logoPath);

            res.json({
                message: 'Team successfully updated',
                success: true,
                team: {
                    name: req.body.name,
                    logo: logoPath,
                },
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating team', success: false });
        }
    },
];

exports.getPlayers = async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(400).json({ message: 'Team ID is required', success: false });
            return;
        }
        let players = await Player.getByTeamID(req.params.id);
        res.json({players: players, success: true});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching players', success: false });
    }
}

exports.getNames = async (req, res) => {
    try {
        let teams = await Team.getNames();
        res.json({teams: teams, success: true});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching team names', success: false });
    }
}

exports.getFirst11 = async (req, res) => {
    try {
        if (!req.params.matchid) {
            res.status(400).json({ message: 'Match ID is required', success: false });
            return;
        }
        if (!req.params.teamid) {
            res.status(400).json({ message: 'Team ID is required', success: false });
            return;
        }
        let teams = await Match.getTeams(req.params.matchid);
        let team = teams.find(team => team.ID == req.params.teamid);
        if (!team) {
            res.status(400).json({ message: 'Team is not in this match', success: false });
            return;
        }
        let first11 = await Team.getFirst11(req.params.matchid);
        res.json({first11: first11, success: true});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching first 11', success: false });
    }
}

exports.getSquad = async (req, res) => {
    try {
        if (!req.params.matchid) {
            res.status(400).json({ message: 'Match ID is required', success: false });
            return;
        }
        if (!req.params.teamid) {
            res.status(400).json({ message: 'Team ID is required', success: false });
            return;
        }
        let teams = await Match.getTeams(req.params.matchid);
        let team = teams.find(team => team.ID == req.params.teamid);
        if (!team) {
            res.status(400).json({ message: 'Team is not in this match', success: false });
            return;
        }
        let squad = await Team.getSquad(req.params.matchid, req.params.teamid);
        res.json({squad: squad, success: true});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching squad', success: false });
    }
}

exports.getCurrent11 = async (req, res) => {
    try {
        if (!req.params.matchid) {
            res.status(400).json({ message: 'Match ID is required', success: false });
            return;
        }
        if (!req.params.teamid) {
            res.status(400).json({ message: 'Team ID is required', success: false });
            return;
        }
        let teams = await Match.getTeams(req.params.matchid);
        let team = teams.find(team => team.ID == req.params.teamid);
        if (!team) {
            res.status(400).json({ message: 'Team is not in this match', success: false });
            return;
        }
        let current11 = await Team.getCurrent11(req.params.matchid, req.params.teamid);
        res.json({current11: current11, success: true});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching current 11', success: false });
    }
}