const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const usersRoute = require('./routes/users');
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb+srv://javod:5MzkHyzeSZFmK35@cluster0.vnfrv.mongodb.net/nearestStorePlatform?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to the Database!');
  })
  .catch(() => {
    console.log('The Connection failed!');
  });

app.use((req,
         res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
app.use("/api/admin", adminRoutes);
app.use("/api/users", usersRoute);

module.exports = app;
// 5MzkHyzeSZFmK35
