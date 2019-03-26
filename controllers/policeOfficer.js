'use strict';

const PoliceOfficerService = require('../services/policeOfficer');
const Boom = require('boom');

module.exports = {
    /**
     * Get Police Officers By Dept Controller
     * @param {Request} req 
     * @param {Response} res 
     */
    async getPoliceOfficersByDept(req, res) {
        try {
            const officers = await PoliceOfficerService.getPoliceOfficersByDept(req.params.departmentId);
            if (!officers) {
                return Boom.notFound('No Police Department Exist with this Id');
            }

            return res.response(officers).code(200);
        } catch (e) {
            return Boom.badRequest(e.message);
        }
    },
    /**
     * Create Police Officer Controller
     * @param {Request} req 
     * @param {Response} res 
     */
    async createPoliceOfficer(req, res) {
        try {
            const officer = await PoliceOfficerService.createPoliceOfficer(req.payload.name, req.params.departmentId);
            return res.response(officer).code(201);
        } catch (e) {
            return Boom.badRequest(e.message);
        }
    },
    /**
     * Get Police Officer Assigned Cases Controller
     * @param {Request} req 
     * @param {Response} res 
     */
    async getPoliceOfficerAssignedCases(req, res) {
        try {
            const assignedCases = await PoliceOfficerService.getPoliceOfficerAssignedCases(req.params.officerId);
            if (assignedCases) {
                return res.response(assignedCases).code(200);
            }

            return Boom.notFound('No Police Officers Exist with this Id');
        } catch (e) {
            return Boom.badRequest(e.message);
        }
    }
};