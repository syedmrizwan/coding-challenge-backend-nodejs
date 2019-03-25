const policeOfficer = require('../controllers/policeOfficer');
const Joi = require('joi');

module.exports = [
    {
        method: 'POST',
        path: '/policeOfficers/{officerId}/stolenBikes/{bikeId}',
        handler: policeOfficer.resolveStolenBikeCase,
        config: {
            description: 'Mark Stolen Bike Case resolved',
            notes: 'Mark Stolen Bike Case resolved',
            tags: ['api', 'policeOfficer'],
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                params: Joi.object({
                    officerId: Joi.number().required(),
                    bikeId: Joi.number().required()
                })
            }
        }
    }
]