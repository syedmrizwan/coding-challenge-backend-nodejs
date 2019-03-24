const bike = require('../controllers/bike');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/bikes',
        handler: bike.getAllBikes,
        config: {
            tags: ['api', 'bike'],
            description: 'Get All Bikes',
        }
    },
    {
        method: 'GET',
        path: '/bikes/{bikeId}',
        handler: bike.getBikeById,
        config: {
            tags: ['api', 'bike'],
            description: 'Get Bike By Id',
            validate: {
                params: Joi.object({
                    bikeId: Joi.number()
                })
            }
        }
    },
    {
        method: 'POST',
        path: '/bikes',
        handler: bike.createBike,
        config: {
            description: 'Create Bike',
            notes: 'Report Stolen Bike',
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