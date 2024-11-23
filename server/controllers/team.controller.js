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
            const logoPath = req.file ? path.join('/uploads/logos', req.file.filename) : null;

            // Insert into the database
            await Team.insert(req.body.name, logoPath);

            res.json({
                message: 'Team successfully created',
                success: true,
                data: {
                    name: req.body.name,
                    logo: logoPath || 'No logo provided',
                },
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating team', success: false });
        }
    },
];


exports.getTeams = async (req, res) => {
    if (req.query.id) {
        let team = await Team.getByID(req.query.id);
        res.json({team: team, players: Player.getByTeamID(req.query.id), success: true});
        return
    }
    let teams = await Team.getAll();
    res.json({teams: teams, success: true});
}


exports.deleteTeam = async (req, res) => {
    await Team.delete(req.query.id);
    res.json({ message: 'Team successfully deleted', success: true });
}

exports.updateTeam = async (req, res) => {
    await Team.update(req.body.id, req.body.name, req.body.photoPath);
    res.json({ message: 'Team successfully updated', success: true });
}