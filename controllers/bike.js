const bikeService = require('../services/bike');
const Boom = require('boom');
module.exports = {
    /**
     * Create Bike Controller
     * @param {Request} req 
     * @param {Response} res 
     */
    async createBike(req, res) {
        try {
            let stolenBikeIncident = await bikeService.createBike(req.payload);
            return res.response(stolenBikeIncident).code(201);
        } catch (e) {
            return Boom.badRequest(e.message);
        }
    },
    /**
     * Get Bike Detail And Department Controller
     * @param {Request} req 
     * @param {Response} res 
     */
    async getBikeDetailAndDepartment(req, res) {
        try {
            let result = await bikeService.getBikeDetailAndDepartment(req.query);
            return res.response(result).code(200);
        } catch (e) {
            return Boom.badRequest(e.message);
        }
    },
    /**
     * Resolve Stolen Bike Case Controller
     * @param {Request} req 
     * @param {Response} res 
     */
    async resolveStolenBikeCase(req, res) {
        try {
            let bikeIncident = await bikeService.resolveStolenBikeCase(req.params.bikeId);
            if (!bikeIncident) {
                return Boom.notFound('No Stolen Bike Case Exist with this Id');
            } else {
                return res.response(bikeIncident).code(200);
            }

        } catch (e) {
            return Boom.badRequest(e.message);
        }
    }


}