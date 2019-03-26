"use strict"
const PoliceOfficer = require('../sequelize/models').PoliceOfficer;
const PoliceDepartment = require('../sequelize/models').PoliceDepartment;
const Bike = require('../sequelize/models').Bike;
module.exports = {
    /**
     * Create Police Officer in the Database
     * @param {String} officerName 
     * @param {Integer} policeDepartmentId 
     * @returns {Object} Police Officer
     */
    async createPoliceOfficer(officerName, policeDepartmentId) {
        try {
            let policeOfficer;
            let isAvailable = true;
            let result = await Bike.getStolenBikeCase();
            if (result.length > 0) {
                isAvailable = false;
            }
            policeOfficer = await PoliceOfficer.create({
                name: officerName,
                departmentId: policeDepartmentId,
                isAvailable: isAvailable
            });
            if (result.length > 0) {
                let caseId = result[0].dataValues.id;
                await Bike.updateBikeAssignedOfficer(caseId, policeOfficer.id);
                policeOfficer.dataValues.assignedCase = caseId;
            }
            return policeOfficer;
        } catch (e) {
            throw Error('Error while Creating Police Officer');
        }
    },
    /**
     * Feth All Police Officers in a Department
     * @param {Integer} policeDepartmentId 
     * @returns {Array} Police Officers 
     */
    async getPoliceOfficersByDept(policeDepartmentId) {
        try {
            let policeDepartment = await PoliceDepartment.findAll({ where: { id: policeDepartmentId } });
            if (policeDepartment.length > 0) {
                let result = await PoliceOfficer.findAll({
                    where: { departmentId: policeDepartmentId }
                })
                return result;
            }
            return false;

        } catch (e) {
            throw Error('Error while Retrieving Police Officers By Department');
        }
    },
    /**
    * Feth All Cases assigned to a Police Officer
    * @param {Integer} officerId 
    * @returns {Array} Assigned Cases 
    */
    async getPoliceOfficerAssignedCases(officerId) {
        try {
            let officerInfoResult = await PoliceOfficer.getOfficerAndDepartment(officerId);
            let result;
            if (officerInfoResult.length > 0) {
                result = officerInfoResult[0].dataValues;
                let incidentResult = await Bike.findAll({
                    where: {
                        assignedOfficerId: officerId
                    }
                })
                if (incidentResult.length > 0) {
                    result['stolenBikeIncidents'] = incidentResult[0].dataValues;
                }
            }
            return result;
        } catch (e) {
            throw Error('Error while Retrieving Police Officer Assigned Cases');
        }
    }
};