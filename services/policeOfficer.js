"use strict"
const PoliceOfficer = require('../sequelize/models').PoliceOfficer;

module.exports = {
    async createPoliceOfficer(req, res) {
        let policeOfficer;
        policeOfficer = await PoliceOfficer.create({
            name: req.payload.name,
            departmentId: req.params.departmentId
        });
        return res.response(policeOfficer).code(200);
    },
    async getPoliceOfficersByDept(req, res) {
        let result = await PoliceOfficer.findAll({
            where: {
                departmentId: req.params.departmentId
            }
        })
        return result;
    },
    async deletePoliceOfficer(req, res) {
        return await PoliceOfficer.destroy({
            where: {
                id: req.params.id
            }
        })
    },
    async updatePoliceOfficer(req, res) {
        req.payload = JSON.parse(JSON.stringify(req.payload));
        return await PoliceOfficer.update(
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