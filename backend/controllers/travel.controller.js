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
