'use strict';

const lab = exports.lab = require('lab').script();
const expect = require('chai').expect;

// prepare environment
const it = lab.it;
const describe = lab.describe;
const before = lab.beforeEach;
// get the server
const start = require('../server');
const db = require('../sequelize/models');

describe('Routes /policeDepartments', () => {
    let departmentId = 1;
    db.PoliceDepartment.destroy({ where: {} }, () => {
        before((done) => {
            let options = {
                method: 'POST',
                url: '/policeDepartments',
                payload: {
                    name: 'NYPD'
                }
            };

            start.server.inject(options, (response) => {
                departmentId = response.result.id;
                done();
            });
        });
    });


    describe('GET /policeDepartments/{departmentId}', () => {
        it('return 404 HTTP status code', (done) => {
            db.PoliceDepartment.destroy({ where: {} }, () => {
                const options = {
                    method: 'GET',
                    url: '/policeDepartments/{departmentId}',
                    params: departmentId
                };
                start.server.inject(options, (response) => {
                    expect(response).to.have.property('statusCode', 404);
                    done();
                });
            });
        });
    });

    describe('POST /policeDepartments', () => {
        it('return 201 HTTP status code', (done) => {
            db.PoliceDepartment.destroy({ where: {} }, () => {
                const options = {
                    method: 'POST',
                    url: '/policeDepartments',
                    payload: { name: 'NYPD' }
                };
                start.server.inject(options, (response) => {
                    expect(response).to.have.property('statusCode', 201);
                    done();
                });
            });
        });
    });
    describe('POST /policeDepartments/{departmentId}/policeOfficers', () => {
        it('return 404 HTTP status code', (done) => {
            db.PoliceDepartment.destroy({ where: {} }, () => {
                const options = {
                    method: 'POST',
                    url: '/policeDepartments/{departmentId}/policeOfficers}',
                    params: 123,
                    payload: { name: 'John Police' }
                };
                start.server.inject(options, (response) => {
                    expect(response).to.have.property('statusCode', 404);
                    done();
                });
            });
        });
    });

    describe('GET /policeDepartments/{departmentId}/policeOfficers', () => {
        it('return 404 HTTP status code', (done) => {
            db.PoliceDepartment.destroy({ where: {} }, () => {
                const options = {
                    method: 'GET',
                    url: '/policeDepartments/{departmentId}/policeOfficers',
                    params: 123
                };
                start.server.inject(options, (response) => {
                    expect(response).to.have.property('statusCode', 404);
                    done();
                });
            });
        });
    });
});