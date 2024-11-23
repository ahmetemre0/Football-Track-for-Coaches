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
    upload.single('photo'), // Expect the photo file in the "photo" field, optional
    async (req, res) => {
        try {
            // Determine the photo path (optional)
            const photoPath = req.file ? path.join('/uploads/photos', req.file.filename) : null;

            // Insert into the database
            await Player.insert(req.body.name, photoPath, req.body.teamID, req.body.number, req.body.position);

            res.json({
                message: 'Player successfully created',
                success: true,
                player: {
                    name: req.body.name,
                    photo: photoPath || 'No photo provided',
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

exports.getPlayers = (req, res) => {
    if (req.query.id) {
        let player = Player.getByID(req.query.id);
        res.json(player);
        return
    }
    let players = Player.getAll();
    res.json(players);
}

exports.deletePlayer = async (req, res) => {
    try {
        await Player.delete(req.params.id);
        res.json({ message: 'Player successfully deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting player' });
    }
}

exports.updatePlayer = [
    upload.single('photo'), // Expect the photo file in the "photo" field, optional
    async (req, res) => {
        try {
            // Determine the photo path (optional)
            const photoPath = req.file ? path.join('/uploads/photos', req.file.filename) : null;

            // Update the database
            await Player.update(req.params.id, req.body.name, photoPath, req.body.teamID, req.body.number, req.body.position);

            res.json({
                message: 'Player successfully updated',
                success: true,
                player: {
                    name: req.body.name,
                    photo: photoPath || 'No photo provided',
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