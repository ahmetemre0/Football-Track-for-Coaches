const Player = require('../handlers/player.handler');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const dir = './uploads/photos';
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

exports.createPlayer = [
    upload.single('photoPath'), // Expect the photo file in the "photo" field, optional
    async (req, res) => {
        try {
            // Determine the photo path (optional)
            const photoPath = req.file ? path.join('/uploads/photos', req.file.filename) : path.join('/uploads/photos', 'default.gif');

            // Insert into the database
            await Player.insert(req.body.name, photoPath, req.body.teamID, req.body.number, req.body.position);

            res.json({
                message: 'Player successfully created',
                success: true,
                player: {
                    name: req.body.name,
                    photoPath: photoPath,
                    teamID: req.body.teamID,
                    number: req.body.number,
                    position: req.body.position,
                },
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating player', success: false });
        }
    },
];

exports.getPlayer = async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(400).json({ message: 'Player ID is required', success: false });
            return;
        }

        let player = await Player.getByID(req.params.id);
        res.json({ player: player, success: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching players', success: false });
    }
}

exports.getPlayers = async (req, res) => {
    try {
        let players = await Player.getAll();
        res.json({ players: players, success: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching players', success: false });
    }
}

exports.deletePlayer = async (req, res) => {
    try {
        await Player.delete(req.params.id);
        res.json({ message: 'Player successfully deleted', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting player', success: false });
    }
}

exports.updatePlayer = [
    upload.single('photoPath'), // Expect the photo file in the "photo" field, optional
    async (req, res) => {
        try {
            // Determine the photo path (optional)
            const photoPath = req.file ? path.join('/uploads/photos', req.file.filename) : path.join('/uploads/photos', 'default.gif');

            // Update the database
            await Player.update(req.params.id, req.body.name, photoPath, req.body.teamID, req.body.number, req.body.position);

            res.json({
                message: 'Player successfully updated',
                success: true,
                player: {
                    name: req.body.name,
                    photo: photoPath,
                    teamID: req.body.teamID,
                    number: req.body.number,
                    position: req.body.position,
                },
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating player', success: false });
        }
    },
]