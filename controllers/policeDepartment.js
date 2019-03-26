const policeDepartmentService = require('../services/policeDepartment');

module.exports = {
    /**
     * Get Polic eDepartment By Id Controller
     * @param {Request} req 
     * @param {Response} res 
     */
    async getPoliceDepartmentById(req, res) {
        return await policeDepartmentService.getPoliceDepartmentById(req, res);
    },
    /**
    * Create Police Department Controller
    * @param {Request} req 
    * @param {Response} res 
    */
    async createPoliceDepartment(req, res) {
        return await policeDepartmentService.createPoliceDepartment(req, res);
    }
}