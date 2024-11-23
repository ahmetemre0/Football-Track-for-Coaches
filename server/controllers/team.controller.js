const Team = require('../handlers/team.handler');
const Player = require('../handlers/player.handler');

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
            const logoPath = req.file ? path.join('/uploads/logos', req.file.filename) : null;
            
            if (!req.params.id) {
                res.status(400).json({ message: 'Team ID is required', success: false });
                return;
            }
            // Update the database
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
        if (!req.query.id) {
            res.status(400).json({ message: 'Team ID is required', success: false });
            return;
        }
        let players = await Player.getByTeamID(req.query.id);
        res.json({players: players, success: true});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching players', success: false });
    }
}

exports.getNames = async (req, res) => {
    try {
        let names = await Team.getNames();
        res.json({names: names, success: true});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching team names', success: false });
    }
}