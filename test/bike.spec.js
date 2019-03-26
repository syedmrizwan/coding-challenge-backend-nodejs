'use strict';

const lab = exports.lab = require('lab').script();
const expect = require('chai').expect;

// prepare environment
const it = lab.it;
const describe = lab.describe;

// get the server
const server = require('../server');
const db = require('../sequelize/models');


describe('GET /stolenBikes', () => {
    it('return 200 HTTP status code', (done) => {
        db.Bike.destroy({ where: {} }, () => {
            const options = {
                method: 'GET',
                url: '/stolenBikes'
            };

            server.inject(options, (response) => {
                expect(response).to.have.property('statusCode', 200);
                done();
            });
        });
    });
});
describe('POST /stolenBikes', () => {
    it('return 201 HTTP status code', (done) => {
        db.Bike.destroy({ where: {} }, () => {
            const options = {
                method: 'POST',
                url: '/stolenBikes',
                payload: { licenseNumber: 'IIA', ownerFullName: 'Syed Rizwan' }
            };
            server.inject(options, (response) => {
                expect(response).to.have.property('statusCode', 201);
                done();
            });
        });
    });
});
describe('POST /stolenBikes/{bikeId}', () => {
    it('return 401 HTTP status code', (done) => {
        db.Bike.destroy({ where: {} }, () => {
            const options = {
                method: 'POST',
                url: '/stolenBikes/{bikeId}',
                params: 123
            };
            server.inject(options, (response) => {
                expect(response).to.have.property('statusCode', 404);
                done();
            });
        });
    });
});

