const policeOfficerService = require('../services/policeOfficer');

module.exports = {
    async getPoliceOfficersByDept(req, res) {
        return await policeOfficerService.getPoliceOfficersByDept(req, res);
    },
    async createPoliceOfficer(req, res) {
        return await policeOfficerService.createPoliceOfficer(req, res);
    },
    async deletePoliceOfficer(req, res) {
        return await policeOfficerService.deletePoliceOfficer(req, res);
    },
    async updatePoliceOfficer(req, res) {
        return await policeOfficerService.updatePoliceOfficer(req, res);
    }
}