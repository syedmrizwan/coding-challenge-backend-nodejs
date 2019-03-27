'use strict';

const Hapi = require('hapi');
const Pack = require('./package');
// const faker = require("faker");
// const times = require("lodash.times");
// const random = require("random");
const db = require('./sequelize/models');

async function start() {
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

    //registers swagger plugins
    await server.register(require("./config/hapi-plugins"));

    //registers swagger plugins
    await server.register(require("./config/hapi-plugins"));

    //Routes
    server.route((require('./routes/policeDepartment')));
    server.route((require('./routes/bike')));
    server.route((require('./routes/policeOfficer')));

    //start the server
    await server.start();
};

start()
    .catch(err => {
        console.log(err);
        process.exit(1);
    })


module.exports = start;