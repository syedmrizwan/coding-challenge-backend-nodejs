'use strict'

const Bike = require('../sequelize/models').Bike;
const PoliceOfficer = require('../sequelize/models').PoliceOfficer;

module.exports = {
    /**
     * Create Stolen Bike Incident in the database
     * @param {Array} bikeParameters 
     * @return {Object} Bike Incident
     */
    async createBike(bikeParameters) {
        try {
            let availablePoliceOfficer;
            const result = await PoliceOfficer.getAvailablePoliceOfficer();
            if (result.length > 0) {
                availablePoliceOfficer = result[0].dataValues.id;
                await PoliceOfficer.changeAvailability(availablePoliceOfficer, false);
            }
            const bike = await Bike.create({
                licenseNumber: bikeParameters.licenseNumber,
                color: bikeParameters.color,
                type: bikeParameters.type,
                ownerFullName: bikeParameters.ownerFullName,
                theftDescription: bikeParameters.theftDescription,
                theftDate: bikeParameters.theftDate,
                assignedOfficerId: availablePoliceOfficer
            });
            return bike;
        } catch (e) {
            throw Error('Error while Reporting Stole Bike Incident');
        }
    },
    /**
     * Feth Bike Detail and the Police department assign with it
     * @param {Array} queryParameters 
     * @return {Array} Bike Incidents
     */
    async getBikeDetailAndDepartment(queryParameters) {
        let whereCondition = {};
        if (queryParameters.licenseNumber) {
            whereCondition['licenseNumber'] = queryParameters.licenseNumber
        }
        if (queryParameters.color) {
            whereCondition['color'] = queryParameters.color
        }
        if (queryParameters.type) {
            whereCondition['type'] = queryParameters.type
        }
        if (queryParameters.ownerFullName) {
            whereCondition['ownerFullName'] = queryParameters.ownerFullName
        }
        if (queryParameters.theftDescription) {
            whereCondition['theftDescription'] = queryParameters.theftDescription
        }
        if (queryParameters.theftDate) {
            whereCondition['theftDate'] = queryParameters.theftDate
        }
        try {
            const result = await Bike.getBikeDetailAndDepartment(whereCondition);
            return result;
        } catch (e) {
            throw Error('Error while Retrieving Bike Detail');
        }
    },
    /**
     * Resolve Stolen Bike Incident
     * @param {Integer} officerId
     * @param {Integer} bikeId
     * @returns {Object} Bike Incident
     */
    async resolveStolenBikeCase(bikeId) {
        try {
            let result = await Bike.findAll({
                where: {
                    id: bikeId
                },
                attributes: ['isResolved', 'assignedOfficerId']
            })
            if (result.length > 0) {
                let assignedOfficerId = result[0].dataValues.assignedOfficerId;
                if (result[0].dataValues.isResolved) {
                    throw Error('Stolen Bike Case is already resolved');
                } else if (assignedOfficerId === null) {
                    throw Error('Stolen Bike Case is not assigned to any Police Officer');
                } else {
                    await Bike.markBikeCaseResolved(bikeId);
                    const caseId = await this.assignCase(assignedOfficerId);
                    if (!caseId) {
                        await PoliceOfficer.changeAvailability(assignedOfficerId, true);
                    }
                    const result = await Bike.findAll({ where: { id: bikeId } });
                    return result;
                }
            } else {
                return false;
            }
        } catch (e) {
            throw Error(e);
        }
    },
    /**
    * Assign a Stolen Bike Incident to Police Officer
    * @param {Integer} officerId 
    */
    async assignCase(officerId) {
        const result = await Bike.getStolenBikeCase();
        if (result.length > 0) {
            const caseId = result[0].dataValues.id;
            await Bike.updateBikeAssignedOfficer(caseId, officerId);
            return caseId;
        }
        return false;
    }
};