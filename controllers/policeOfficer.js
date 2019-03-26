const policeOfficerService = require('../services/policeOfficer');

module.exports = {
    /**
     * Get Police Officers By Dept Controller
     * @param {Request} req 
     * @param {Response} res 
     */
    async getPoliceOfficersByDept(req, res) {
        return await policeOfficerService.getPoliceOfficersByDept(req, res);
    },
    /**
     * Resolve Stolen Bike Case Controller
     * @param {Request} req 
     * @param {Response} res 
     */
    async resolveStolenBikeCase(req, res) {
        return await policeOfficerService.resolveStolenBikeCase(req, res);
    },
    /**
     * Create Police Officer Controller
     * @param {Request} req 
     * @param {Response} res 
     */
    async createPoliceOfficer(req, res) {
        return await policeOfficerService.createPoliceOfficer(req, res);
    },
    /**
     * Get Police Officer Assigned Cases Controller
     * @param {Request} req 
     * @param {Response} res 
     */
    async getPoliceOfficerAssignedCases(req, res) {
        return await policeOfficerService.getPoliceOfficerAssignedCases(req, res);
    }
}