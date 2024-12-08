const Action = require('../handlers/action.handler');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const dir = './uploads/actions';
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

exports.getAll = async (req, res) => {
    try {
        let actions = await Action.getAll();
        res.json({ actions: actions, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching actions', success: false });
    }
}

exports.getByID = async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(400).json({ message: 'Action ID is required', success: false });
            return;
        }
        let action = await Action.getByID(req.params.id);

        if (!action) {
            res.status(404).json({ message: 'Action not found', success: false });
            return;
        }
        res.json({ action: action, success: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching action', success: false });
    }
}

exports.delete = async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(400).json({ message: 'Action ID is required', success: false });
            return;
        }
        let action = await Action.getByID(req.params.id);
        if (!action) {
            res.status(404).json({ message: 'Action not found', success: false });
            return;
        }
        await Action.delete(req.params.id);
        res.json({ message: 'Action successfully deleted', success: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting action', success: false });
    }
}

exports.insert = [
    upload.single('logo'), // Expect the logo file in the "logo" field, optional
    async (req, res) => {
        try {
            if (!req.body.name) {
                res.status(400).json({ message: 'Name is required', success: false });
                return;
            }

            let logo = null;
            if (req.file) {
                logo = req.file.path;
            }

            await Action.insert(req.body.name, logo, req.body.hasPlayer1, req.body.hasPlayer2, req.body.hasArea);
            res.json({
                message: 'Action successfully created',
                success: true,
                action: {
                    name: req.body.name,
                    hasPlayer1: req.body.hasPlayer1,
                    hasPlayer2: req.body.hasPlayer2,
                    hasArea: req.body.hasArea,
                    logo: logo,
                },
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating action', success: false });
        }
    }
];

exports.update = [
    upload.single('logo'), // Expect the logo file in the "logo" field, optional
    async (req, res) => {
        try {
            if (!req.params.id) {
                res.status(400).json({ message: 'Action ID is required', success: false });
                return;
            }
            let action = await Action.getByID(req.params.id);
            if (!action) {
                res.status(404).json({ message: 'Action not found', success: false });
                return;
            }

            let logo = action.logo;
            if (req.file) {
                logo = req.file.path;
            }

            await Action.update(req.params.id, req.body.name, logo, req.body.hasPlayer1, req.body.hasPlayer2, req.body.hasArea);
            
            let updatedAction = await Action.getByID(req.params.id);
            
            res.json({
                message: 'Action successfully updated',
                success: true,
                action: updatedAction,
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating action', success: false });
        }
    }
];