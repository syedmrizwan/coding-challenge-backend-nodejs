"use strict"
const PoliceDepartment = require('../sequelize/models').PoliceDepartment;

module.exports = {
    async createPoliceDepartment(req, res) {
        let policeDepartment;
        policeDepartment = await PoliceDepartment.create({
            name: req.payload.name
        });
        return res.response(policeDepartment).code(200);
    },
    async getAllPoliceDepartments() {
        let result = await PoliceDepartment.findAll()
        return result;
    },
    async getPoliceDepartmentById(req, res) {
        let result = await PoliceDepartment.findAll({
            where: {
                id: req.params.departmentId
            }
        })
        return result;
    },
    async deletePoliceDepartment(req, res) {
        return await PoliceDepartment.destroy({
            where: {
                id: req.params.id
            }
        })
    },
    async updatePoliceDepartment(req, res) {
        req.payload = JSON.parse(JSON.stringify(req.payload));
        return await PoliceDepartment.update(
            {
                name: req.payload.name
            },
            {
                where:
                    { id: req.params.id }
            }
        )
    }
};