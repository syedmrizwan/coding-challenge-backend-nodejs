'use strict';

const BikeService = require('../services/bike');
const Boom = require('boom');

module.exports = {
    /**
     * Create Bike Controller
     * @param {Request} req 
     * @param {Response} res 
     */
    async createBike(req, res) {
        try {
            const stolenBikeIncident = await BikeService.createBike(req.payload);
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
            const result = await BikeService.getBikeDetailAndDepartment(req.query);
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
            const bikeIncident = await BikeService.resolveStolenBikeCase(req.params.bikeId);
            if (!bikeIncident) {
                return Boom.notFound('No Stolen Bike Case Exist with this Id');
            }

            return res.response(bikeIncident).code(200);
        } catch (e) {
            return Boom.badRequest(e.message);
        }
    }


};