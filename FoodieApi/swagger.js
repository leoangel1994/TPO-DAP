const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Foodie API',
    description: 'es una aplicación que tiene el enfoque de ser una red social de recetas de cocina, donde los usuarios podrán Crear y visualizar recetas.'
    
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./app.js')
});