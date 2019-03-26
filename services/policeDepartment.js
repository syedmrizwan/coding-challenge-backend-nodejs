"use strict"
const PoliceDepartment = require('../sequelize/models').PoliceDepartment;

module.exports = {
    /**
     * Create a Police Depatment in the Database
     * @param {String} departmentName 
     * @return {Object} Police Department
     */
    async createPoliceDepartment(departmentName) {
        try {
            let policeDepartment = await PoliceDepartment.create({
                name: departmentName
            });
            return policeDepartment;
        } catch (e) {
            throw Error('Error while Creating Police Department');
        }
    },
    /**
     * Feth Police Department By Id
     * @param {Integer} departmentId 
     * @return {Object} Police Department
     */
    async getPoliceDepartmentById(departmentId) {
        try {
            let result = await PoliceDepartment.findAll({
                where: {
                    id: departmentId
                }
            })
            return result;
        } catch (e) {
            throw Error('Error while Retrieving Police Department');
        }
    }
};