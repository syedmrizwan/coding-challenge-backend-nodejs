"use strict"
const Bike = require('../sequelize/models').Bike;
const PoliceOfficer = require('../sequelize/models').PoliceOfficer;
module.exports = {
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
    async getAllBikes() {
        let result = await Bike.findAll()
        return result;
    },
    async getBikeById(req, res) {
        let result = await Bike.findAll({
            where: {
                id: req.params.bikeId
            }
        })
        return result;
    },
    async deleteBike(req, res) {
        return await Bike.destroy({
            where: {
                id: req.params.id
            }
        })
    }
};