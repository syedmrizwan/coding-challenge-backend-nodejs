const policeOfficerService = require('../services/policeOfficer');
const Boom = require('boom');
module.exports = {
    /**
     * Get Police Officers By Dept Controller
     * @param {Request} req 
     * @param {Response} res 
     */
    async getPoliceOfficersByDept(req, res) {
        try {
            let officers = await policeOfficerService.getPoliceOfficersByDept(req.params.departmentId);
            if (!officers) {
                return Boom.notFound('No Police Department Exist with this Id');
            } else {
                return res.response(officers).code(200);
            }
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
            let officer = await policeOfficerService.createPoliceOfficer(req.payload.name, req.params.departmentId);
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
            let assignedCases = await policeOfficerService.getPoliceOfficerAssignedCases(req.params.officerId);
            if (assignedCases) {
                return res.response(assignedCases).code(200);
            }
            else {
                return Boom.notFound('No Police Officers Exist with this Id');
            }
        } catch (e) {
            return Boom.badRequest(e.message);
        }
    }
}