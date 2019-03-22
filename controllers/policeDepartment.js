const policeDepartmentService = require('../services/policeDepartment');

module.exports = {
    async getAllPoliceDepartments() {
        return await policeDepartmentService.getAllPoliceDepartments();
    },
    async getPoliceDepartmentById(req, res) {
        return await policeDepartmentService.getPoliceDepartmentById(req, res);
    },
    async createPoliceDepartment(req, res) {
        return await policeDepartmentService.createPoliceDepartment(req, res);
    },
    async deletePoliceDepartment(req, res) {
        return await policeDepartmentService.deletePoliceDepartment(req, res);
    },
    async updatePoliceDepartment(req, res) {
        return await policeDepartmentService.updatePoliceDepartment(req, res);
    }
}