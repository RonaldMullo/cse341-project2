const swaggerAutogen = require('swagger-autogen')();

const isProduction = process.env.NODE_ENV === 'production';

const doc = {
  info: {
    title: 'Psychology Clinic API',
    description:
      'REST API for managing fictitious psychology clinic patients and sessions. Created for CSE 341 Project 2.'
  },
  host: isProduction
    ? 'cse341-project2-323l.onrender.com'
    : 'localhost:3000',
  schemes: isProduction ? ['https'] : ['http']
};

const outputFile = './swagger-output.json';

const endpointsFiles = [
  './routes/index.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc);