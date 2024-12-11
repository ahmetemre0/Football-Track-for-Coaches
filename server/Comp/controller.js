const Comp = require('./handler');

exports.getAll = async (req, res) => {
    try {
        let comps = await Comp.getAll();
        res.json({ comps: comps, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching comps', success: false });
    }
}

exports.getByID = async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(400).json({ message: 'Comp ID is required', success: false });
            return;
        }
        let comp = await Comp.getByID(req.params.id);

        if (!comp) {
            res.status(404).json({ message: 'Comp not found', success: false });
            return;
        }
        res.json({ comp: comp, success: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching comp', success: false });
    }
}