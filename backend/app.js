require ('dotenv').config ();
const express = require ('express');
const jwt = require ('jsonwebtoken');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');

const app = express ();

const authRoute = require ('./routes/auth.route.js');
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
app.get ('/cities', (req, res) => {
  const result = [
    {cityName: 'Mumbai', state: 'Maharashtra'},
    {cityName: 'Delhi', state: 'Delhi'},
    {cityName: 'Bengaluru', state: 'Karnataka'},
    {cityName: 'Chennai', state: 'Tamil Nadu'},
    {cityName: 'Kolkata', state: 'West Bengal'},
    {cityName: 'Hyderabad', state: 'Telangana'},
    {cityName: 'Pune', state: 'Maharashtra'},
    {cityName: 'Ahmedabad', state: 'Gujarat'},
    {cityName: 'Jaipur', state: 'Rajasthan'},
    {cityName: 'Lucknow', state: 'Uttar Pradesh'},
    {cityName: 'Surat', state: 'Gujarat'},
    {cityName: 'Nagpur', state: 'Maharashtra'},
    {cityName: 'Indore', state: 'Madhya Pradesh'},
    {cityName: 'Bhopal', state: 'Madhya Pradesh'},
    {cityName: 'Patna', state: 'Bihar'},
    {cityName: 'Chandigarh', state: 'Chandigarh'},
    {cityName: 'Coimbatore', state: 'Tamil Nadu'},
    {cityName: 'Thane', state: 'Maharashtra'},
    {cityName: 'Visakhapatnam', state: 'Andhra Pradesh'},
    {cityName: 'Kanpur', state: 'Uttar Pradesh'},
  ];

  res.send (result);
});

app.listen (port, () => {
  console.log (`Server is runnning on port ${port}`);
});
