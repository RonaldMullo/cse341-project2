const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Psychology Clinic API',
    description:
      'REST API for managing fictitious psychology clinic patients and sessions. Created for CSE 341 Project 2.'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './swagger-output.json';

const endpointsFiles = [
  './routes/index.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc);