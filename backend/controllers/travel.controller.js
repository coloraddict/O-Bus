const axios = require ('axios');
const City = require ('../models/city');

exports.cities = (req, res, next) => {
  let fetchedCities;

  City.find ().then (cities => {
    res.status (200).json ({
      cities,
    });
  });
};

exports.addCity = (req, res, next) => {
  const city = new City ({
    cityName: req.body.cityName,
    state: req.body.state,
  });

  city.save ().then (result => {
    res.status (200).json ({
      message: 'City added',
      result,
    });
  });
};

exports.getDuration = async (req, res, next) => {
  try {
    const response = await axios.post (
      'https://api.openrouteservice.org/v2/matrix/driving-car',
      req.body,
      {
        headers: {
          Authorization: process.env.openRouteApiKey,
          'Content-Type': 'application/json',
        },
      }
    );
    const duration = response.data.durations[0][1];
    const distance = response.data.distances[0][1];
    res.json ({
      duration,
      distance,
      durationHours: Math.floor (duration / 3600),
      durationMinutes: Math.floor (duration % 3600 / 60),
      distanceKm: (distance / 1000).toFixed (2),
    });
  } catch (error) {
    res.status (500).json (error.message);
  }
};
