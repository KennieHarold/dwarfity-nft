const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

module.exports.config = (app) => {
  const mongoUrl = process.env.DB_CONNECTION_STRING;

  mongoose.connect(mongoUrl).then(
    () => {
      console.log('Connected to MongoDB!');
    },
    (error) => {
      console.log('Error connecting to MongoDb ' + error);
    }
  );

  app.use(
    session({
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl,
        touchAfter: 24 * 3600
      }),
      cookie: { secure: true }
    })
  );
};
