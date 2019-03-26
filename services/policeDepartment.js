"use strict"
const PoliceDepartment = require('../sequelize/models').PoliceDepartment;

module.exports = {
    /**
     * Create a Police Depatment in the Database
     * @param {Request} req 
     * @param {Response} res 
     */
    async createPoliceDepartment(req, res) {
        let policeDepartment;
        policeDepartment = await PoliceDepartment.create({
            name: req.payload.name
        });
        return res.response(policeDepartment).code(200);
    },
    /**
     * Feth Police Department By Id
     * @param {Request} req 
     * @param {Response} res 
     */
    async getPoliceDepartmentById(req, res) {
        let result = await PoliceDepartment.findAll({
            where: {
                id: req.params.departmentId
            }
        })
        return result;
    }
};