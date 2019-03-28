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
    //await db.sequelize.sync();

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