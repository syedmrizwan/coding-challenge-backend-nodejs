const HapiSwagger = require('hapi-swagger');
const Pack = require('../package');
const Inert = require('inert');
const Vision = require('vision');

let swaggerOptions = {
    info: {
        title: 'Stolen Bike Cases API',
        version: Pack.version,
        description: 'Stolen Bike Cases API'
    }
};

// Blipp - Needs updating for Hapi v17.x
module.exports = [
    //Inert and Vision are required by swagger.
    Inert,
    Vision,
    {
        plugin: HapiSwagger,
        options: swaggerOptions
    }
];
