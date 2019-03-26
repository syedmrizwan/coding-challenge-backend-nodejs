"use strict"
const PoliceOfficer = require('../sequelize/models').PoliceOfficer;
const Bike = require('../sequelize/models').Bike;
module.exports = {
    /**
     * Create Police Officer in the Database
     * @param {Request} req 
     * @param {Response} res 
     */
    async createPoliceOfficer(req, res) {
        let policeOfficer;
        let isAvailable = true;
        let result = await Bike.getStolenBikeCase();
        if (result.length > 0) {
            isAvailable = false;
        }
        policeOfficer = await PoliceOfficer.create({
            name: req.payload.name,
            departmentId: req.params.departmentId,
            isAvailable: isAvailable
        });
        if (result.length > 0) {
            let caseId = result[0].dataValues.id;
            await Bike.updateBikeAssignedOfficer(caseId, policeOfficer.id);
            policeOfficer.dataValues.assignedCase = caseId;
        }
        return res.response(policeOfficer).code(200);
    },
    /**
     * Feth All Police Officers in a Department
     * @param {Request} req 
     * @param {Response} res 
     */
    async getPoliceOfficersByDept(req, res) {
        let result = await PoliceOfficer.findAll({
            where: {
                departmentId: req.params.departmentId
            }
        })
        return result;
    },
    /**
     * Resolve Stolen Bike Incident
     * @param {Request} req 
     * @param {Response} res 
     */
    async resolveStolenBikeCase(req, res) {
        let officerId = req.params.officerId;
        await Bike.markBikeCaseResolved(req.params.bikeId);
        let caseId = await this.assignCase(officerId);
        if (!caseId) {
            await PoliceOfficer.changeAvailability(officerId, true);
        }
        let result = await Bike.findAll({
            where: {
                id: req.params.bikeId
            }
        })
        return result;
    },
    /**
    * Feth All Cases assigned to a Police Officer
    * @param {Request} req 
    * @param {Response} res 
    */
    async getPoliceOfficerAssignedCases(req, res) {
        let officerId = req.params.officerId;
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
    },
    /**
     * Assign a Stolen Bike Incident to Police Officer
     * @param {Integer} officerId 
     */
    async assignCase(officerId) {
        let result = await Bike.getStolenBikeCase();
        if (result.length > 0) {
            let caseId = result[0].dataValues.id;
            await Bike.updateBikeAssignedOfficer(caseId, officerId);
            return caseId;
        }
        return false;
    }

};