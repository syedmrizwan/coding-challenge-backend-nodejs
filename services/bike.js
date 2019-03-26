"use strict"
const Bike = require('../sequelize/models').Bike;
const PoliceOfficer = require('../sequelize/models').PoliceOfficer;
module.exports = {
    /**
     * Create Stolen Bike Incident in the database
     * @param {Request} req 
     * @param {Response} res 
     */
    async createBike(req, res) {
        let availablePoliceOfficer;
        let result = await PoliceOfficer.getAvailablePoliceOfficer();
        if (result.length > 0) {
            availablePoliceOfficer = result[0].dataValues.id;
            await PoliceOfficer.changeAvailability(availablePoliceOfficer, false);
        }
        let bike;
        bike = await Bike.create({
            licenseNumber: req.payload.licenseNumber,
            color: req.payload.color,
            type: req.payload.type,
            ownerFullName: req.payload.ownerFullName,
            theftDescription: req.payload.theftDescription,
            theftDate: req.payload.theftDate,
            assignedOfficerId: availablePoliceOfficer
        });
        return res.response(bike).code(200);
    },
    /**
     * Feth Bike Detail and the Police department assign with it
     * @param {Request} req 
     * @param {Response} res 
     */
    async getBikeDetailAndDepartment(req, res) {
        let whereCondition = {};
        if (req.query.licenseNumber) {
            whereCondition['licenseNumber'] = req.query.licenseNumber
        }
        if (req.query.color) {
            whereCondition['color'] = req.query.color
        }
        if (req.query.type) {
            whereCondition['type'] = req.query.type
        }
        if (req.query.ownerFullName) {
            whereCondition['ownerFullName'] = req.query.ownerFullName
        }
        if (req.query.theftDescription) {
            whereCondition['theftDescription'] = req.query.theftDescription
        }
        if (req.query.theftDate) {
            whereCondition['theftDate'] = req.query.theftDate
        }
        let result = await Bike.getBikeDetailAndDepartment(whereCondition);
        return result;
    }
};