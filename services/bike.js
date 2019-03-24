"use strict"
const Bike = require('../sequelize/models').Bike;

module.exports = {
    async createBike(req, res) {
        let bike;
        bike = await Bike.create({
            //paymentHashes ? paymentHashes.dataValues.approvalHash : ''
            licenseNumber: req.payload.licenseNumber,
            color: req.payload.color,
            type: req.payload.type,
            ownerFullName: req.payload.ownerFullName,
            theftDescription: req.payload.theftDescription,
            theftDate: req.payload.theftDate
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
    },
    async updateBike(req, res) {
        req.payload = JSON.parse(JSON.stringify(req.payload));
        return await Bike.update(
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