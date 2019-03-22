const policeDepartment = require('../controllers/policeDepartment');
const policeOfficer = require('../controllers/policeOfficer');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/policeDepartments',
        handler: policeDepartment.getAllPoliceDepartments,
        config: {
            tags: ['api', 'policeDepartment'],
            description: 'Get All Police Departments',
        }
    },
    {
        method: 'GET',
        path: '/policeDepartments/{departmentId}',
        handler: policeDepartment.getPoliceDepartmentById,
        config: {
            tags: ['api', 'policeDepartment'],
            description: 'Get Police Department By Id',
            validate: {
                params: Joi.object({
                    departmentId: Joi.number()
                })
            }
        }
    },
    {
        method: 'POST',
        path: '/policeDepartments',
        handler: policeDepartment.createPoliceDepartment,
        config: {
            description: 'Create Police Department',
            notes: 'Create Police Department',
            tags: ['api', 'police Department'],
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                payload: Joi.object({
                    name: Joi.string().required()
                })
            }
        }
    },
    {
        method: 'POST',
        path: '/policeDepartments/{departmentId}/policeOfficers',
        handler: policeOfficer.createPoliceOfficer,
        config: {
            description: 'Create Police Officer in a Department',
            notes: 'Create Police Officer',
            tags: ['api', 'policeOfficer'],
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                payload: Joi.object({
                    name: Joi.string().required()
                }),
                params: Joi.object({
                    departmentId: Joi.number()
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/policeDepartments/{departmentId}/policeOfficers',
        handler: policeOfficer.getPoliceOfficersByDept,
        config: {
            tags: ['api', 'policeOfficer'],
            description: 'Get All Police Officers in a Department',
            validate: {
                params: Joi.object({
                    departmentId: Joi.number()
                })
            }
        }
    }

]