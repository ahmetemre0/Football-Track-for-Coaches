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
            if (!req.body.hasDoneTeamSide) {
                req.body.hasDoneTeamSide = false;
            }
            if (!req.body.hasAffectedTeamSide) {
                req.body.hasAffectedTeamSide = false;
            }
            if (!req.body.hasByPlayer) {
                req.body.hasByPlayer = false;
            }
            if (!req.body.hasToPlayer) {
                req.body.hasToPlayer = false;
            }
            if (!req.body.hasArea) {
                req.body.hasArea = false;
            }

            let logoPath = null;
            if (req.file) {
                logoPath = req.file.path;
            }

            await Action.insert(req.body.name, req.body.hasDoneTeamSide, req.body.hasAffectedTeamSide, req.body.hasByPlayer, req.body.hasToPlayer, req.body.hasArea, logoPath);
            res.json({
                message: 'Action successfully created',
                success: true,
                action: {
                    name: req.body.name,
                    hasDoneTeamSide: req.body.hasDoneTeamSide,
                    hasAffectedTeamSide: req.body.hasAffectedTeamSide,
                    hasByPlayer: req.body.hasByPlayer,
                    hasToPlayer: req.body.hasToPlayer,
                    hasArea: req.body.hasArea,
                    logo: logoPath,
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

            let logoPath = action.logo;
            if (req.file) {
                logoPath = req.file.path;
            }

            await Action.update(req.params.id, req.body.name, req.body.hasDoneTeamSide, req.body.hasAffectedTeamSide, req.body.hasByPlayer, req.body.hasToPlayer, req.body.hasArea, logoPath);
            
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