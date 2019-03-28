'use strict';

const Hapi = require('hapi');

async function start() {
    const server = await new Hapi.Server({
        host: '0.0.0.0',
        port: process.env.PORT || 8000,
        routes: { cors: true }
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

start().catch(err => {
    console.log(err);
    process.exit(1);
})


module.exports = start;