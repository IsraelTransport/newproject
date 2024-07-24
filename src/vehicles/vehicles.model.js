
const { getVehiclesFromDB } = require('./vehicles.db');

async function getVehicles() {
    try {
        return await getVehiclesFromDB();
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getVehicles
}