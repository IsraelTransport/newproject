const {getVehicles} = require('./vehicles.model');

async function getAllVehicles(req, res) {
    try {
        let vehicles = await getVehicles();
        res.status(200).json({ vehicles });
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = {
    getAllVehicles
}