const policeOfficer = require('../controllers/policeOfficer');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/policeOfficers/{officerId}',
        handler: policeOfficer.getPoliceOfficerAssignedCases,
        config: {
            tags: ['api', 'policeOfficer'],
            description: 'Get Police Oficer Information and Assigned Cases',
            validate: {
                params: Joi.object({
                    officerId: Joi.number()
                })
            }
        }
    }
]