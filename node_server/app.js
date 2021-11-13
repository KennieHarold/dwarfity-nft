const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());

require('dotenv').config();
require('./config/mongoDB.config').config(app);
require('./routes').setupRoutes(app);

//  Start the server!
const httpServer = require('http').createServer(app);
const port = process.env.NODE_PORT || 8080;

httpServer.listen(port, () => {
  console.log(`Server up and running on port ${port}!`);
});

process.on('uncaughtException', (error) => {
  console.log(error);
});
