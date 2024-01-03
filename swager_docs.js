const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Agency Tracking API',
      version: '1.0.0',
    },
    
    servers:[
        {
            // url:process.env.SERVER_URL,
            url:"http://localhost:4000",
        }
    ]   
  }, 
  apis: ['route.docs.js'], // Replace 'app.js' with the file that contains your API routes
};

const specs = swaggerJsdoc(options);

module.exports = specs;
