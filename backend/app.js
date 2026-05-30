const express = require ('express');
const app = express ();
const cors = require ('cors');
const port = 3000;

app.use (cors ());
app.use (express.json ());
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
