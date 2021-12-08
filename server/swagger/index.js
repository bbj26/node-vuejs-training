const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const PORT = 4101 || process.env.PORT;
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'To-do API',
      version: '1.0.0',
      description: 'To-do app API'
    },
    basePath: '/server/swagger',
    servers: [
      {
        url: `http://localhost:${PORT}`
      }
    ]
  },
  apis: ['./server/swagger/*.yaml'],
};
const specs = swaggerJsDoc(options);

module.exports = {
  swaggerUI,
  specs
};