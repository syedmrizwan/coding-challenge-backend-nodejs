'use strict';

const lab = exports.lab = require('lab').script();
const expect = require('chai').expect;

// prepare environment
const it = lab.it;
const describe = lab.describe;
const before = lab.beforeEach;
const after = lab.after;

// get the server
const server = require('../server');
const db = require('../sequelize/models');

describe('Routes /policeDepartments', () => {
    before(() => { });
    after(async () => {
        await db.Bike.destroy({ where: {} });
        await db.PoliceOfficer.destroy({ where: {} });
        await db.PoliceDepartment.destroy({ where: {} });
    });
    describe('POST /policeDepartments', () => {
        it('return 201 HTTP status code', async () => {
            const options = { method: 'POST', url: '/policeDepartments', payload: { name: 'NYPD' } };
            const response = await server.inject(options);
            expect(response).to.have.property('statusCode', 201);
        });
    });

    describe('GET /policeDepartments/{departmentId}', () => {
        it('return 200 HTTP status code', async () => {
            let options = { method: 'POST', url: '/policeDepartments', payload: { name: 'NYPD' } };
            let response = await server.inject(options);
            let departmentId = response.result.dataValues.id;

            options = { method: 'GET', url: '/policeDepartments/' + departmentId };
            response = await server.inject(options);
            expect(response).to.have.property('statusCode', 200);
            expect(response.result[0].dataValues.id).equal(departmentId);
        });
    });

    describe('POST /policeDepartments/{departmentId}/policeOfficers', () => {
        it('return 201 HTTP status code', async () => {
            let options = { method: 'POST', url: '/policeDepartments', payload: { name: 'NYPD' } };
            let response = await server.inject(options);
            let departmentId = response.result.dataValues.id;
            options = { method: 'POST', url: '/policeDepartments/' + departmentId + '/policeOfficers', payload: { name: 'John Officer' } };
            response = await server.inject(options);
            expect(response).to.have.property('statusCode', 201);
        });
    });

    describe('GET /policeDepartments/{departmentId}/policeOfficers', () => {
        it('return 200 HTTP status code', async () => {
            let options = { method: 'POST', url: '/policeDepartments', payload: { name: 'NYPD' } };
            let response = await server.inject(options);
            let departmentId = response.result.dataValues.id;
            options = { method: 'POST', url: '/policeDepartments/' + departmentId + '/policeOfficers', payload: { name: 'John Officer' } };
            response = await server.inject(options);
            let officerId = response.result.dataValues.id;

            options = { method: 'GET', url: '/policeDepartments/' + departmentId + '/policeOfficers' };
            response = await server.inject(options);
            expect(response).to.have.property('statusCode', 200);
            expect(response.result[0].dataValues.id).equal(officerId);
        });
    });
});
