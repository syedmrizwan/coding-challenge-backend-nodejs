const bike = require('../controllers/bike');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/stolenBikes',
        handler: bike.getBikeDetailAndDepartment,
        config: {
            tags: ['api', 'stolenBikes'],
            description: 'Get All Stolen Bikes Incident',
            validate: {
                query: Joi.object({
                    licenseNumber: Joi.string(),
                    color: Joi.string(),
                    type: Joi.string(),
                    ownerFullName: Joi.string(),
                    theftDescription: Joi.string(),
                    theftDate: Joi.date().iso()
                })
            }
        }
    },
    {
        method: 'POST',
        path: '/stolenBikes',
        handler: bike.createBike,
        config: {
            description: 'Report Stolen Bike Incident',
            tags: ['api', 'bike'],
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                payload: Joi.object({
                    licenseNumber: Joi.string().required(),
                    color: Joi.string(),
                    type: Joi.string(),
                    ownerFullName: Joi.string().required(),
                    theftDescription: Joi.string(),
                    theftDate: Joi.date().iso()
                })
            }
        }
    }
]