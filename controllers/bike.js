const bikeService = require('../services/bike');

module.exports = {
    async getAllBikes() {
        return await bikeService.getAllBikes();
    },
    async getBikeById(req, res) {
        return await bikeService.getBikeById(req, res);
    },
    async createBike(req, res) {
        return await bikeService.createBike(req, res);
    },
    async deleteBike(req, res) {
        return await bikeService.deleteBike(req, res);
    },
    async updateBike(req, res) {
        return await bikeService.updateBike(req, res);
    }
}