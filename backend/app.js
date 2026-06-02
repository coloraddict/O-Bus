require ('dotenv').config ();
const express = require ('express');
const jwt = require ('jsonwebtoken');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');

const app = express ();

const authRoute = require ('./routes/auth.route.js');
const travelRoute = require ('./routes/travel.route.js');
const port = 3000;

const cors = require ('cors');
const corsOption = {
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

mongoose.set ('strictQuery', true);

mongoose
  .connect (process.env.DB_CONN)
  .then (() => {
    console.log ('Connected to database');
  })
  .catch (err => {
    console.log (err);
    console.log ('Connection failed');
  });

app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended: false}));
app.use (cors (corsOption));
app.use (express.json ());
app.use ('/api/auth', authRoute);
app.use ('/api/travel', travelRoute);

app.listen (port, () => {
  console.log (`Server is runnning on port ${port}`);
});
