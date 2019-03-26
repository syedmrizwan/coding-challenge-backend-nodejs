const policeDepartmentService = require('../services/policeDepartment');
const Boom = require('boom');
module.exports = {
    /**
     * Get Polic eDepartment By Id Controller
     * @param {Request} req 
     * @param {Response} res 
     */
    async getPoliceDepartmentById(req, res) {
        try {
            let department = await policeDepartmentService.getPoliceDepartmentById(req.params.departmentId);
            if (department.length > 0) {
                return res.response(department).code(200);
            }
            else {
                return Boom.notFound('No Police Department Exist with this Id');
            }
        } catch (e) {
            return Boom.badRequest(e.message);
        }
    },
    /**
    * Create Police Department Controller
    * @param {Request} req 
    * @param {Response} res 
    */
    async createPoliceDepartment(req, res) {
        try {
            let department = await policeDepartmentService.createPoliceDepartment(req.payload.name);
            return res.response(department).code(201);
        } catch (e) {
            return Boom.badRequest(e.message);
        }
    }
}