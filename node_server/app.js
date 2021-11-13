const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config();
require('./config/mongoDB.config').config(app);
require('./routes').setupRoutes(app);

app.use(bodyParser.json());

//  Start the server!
const httpServer = require('http').createServer(app);
const port = process.env.PORT || 8080;

httpServer.listen(port, () => {
  console.log(`Server up and running on port ${port}!`);
});

process.on('uncaughtException', (error) => {
  console.log(error);
});
