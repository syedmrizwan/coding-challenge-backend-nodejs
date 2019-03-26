'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
// const faker = require("faker");
// const times = require("lodash.times");
// const random = require("random");
const db = require('./sequelize/models');


(async () => {
    const server = await new Hapi.Server({
        host: 'localhost',
        port: 8000,
        routes: {
            cors: true
        }
    });

    //initialize sequalize
    db.sequelize.sync().then(() => {
        // populate PoliceDepartment table with dummy data
        // db.PoliceDepartment.bulkCreate(
        //     times(10, () => ({
        //         name: faker.fake("Police Station {{address.state}}")
        //     }))
        // );
        // // populate PoliceOfficer table with dummy data
        // db.PoliceOfficer.bulkCreate(
        //     times(10, () => ({
        //         name: faker.name.firstName(),
        //         departmentId: random.int(min = 1, max = 10)
        //     }))
        // );
    });




    ///

    const swaggerOptions = {
        info: {
            title: 'Stolen Bike Cases',
            version: Pack.version,
        },
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    try {
        await server.start();
        console.log('Server running at:', server.info.uri);
    } catch (err) {
        console.log(err);
    }
    server.route((require('./routes/policeDepartment')));
    server.route((require('./routes/bike')));
    server.route((require('./routes/policeOfficer')));

})();