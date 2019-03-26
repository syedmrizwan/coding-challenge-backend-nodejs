const bikeService = require('../services/bike');

module.exports = {
    /**
     * Create Bike Controller
     * @param {Request} req 
     * @param {Response} res 
     */
    async createBike(req, res) {
        return await bikeService.createBike(req, res);
    },
    /**
     * Get Bike Detail And Department Controller
     * @param {Request} req 
     * @param {Response} res 
     */
    async getBikeDetailAndDepartment(req, res) {
        return await bikeService.getBikeDetailAndDepartment(req, res);
    }
}