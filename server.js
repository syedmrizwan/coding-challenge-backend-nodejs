'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server({ port: process.env.PORT || 8000, routes: { cors: true } });

async function start() {

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

start().catch(err => {
    console.log(err);
    process.exit(1);
})


module.exports = server;