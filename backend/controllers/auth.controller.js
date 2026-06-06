const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const User = require ('../models/user');

exports.register = (req, res, next) => {
  console.log (req.body);
  bcrypt.hash (req.body.password, 10).then (hash => {
    const user = new User ({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      userName: req.body.userName,
      password: hash,
    });
    user
      .save ()
      .then (result => {
        res.status (201).json ({
          message: 'User Created',
          result: result,
        });
      })
      .catch (err => {
        console.error ('Error saving user:', err);
        res.status (500).json ({
          message: 'Invalid authentication credentials',
          error: err.message,
        });
      });
  });
};

exports.login = (req, res, next) => {
  let fetchedUser;
  User.findOne ({userName: req.body.userName})
    .then (user => {
      if (!user) {
        return Promise.reject (new Error ('User not found'));
      }
      fetchedUser = user;
      return bcrypt.compare (req.body.password, user.password);
    })
    .then (result => {
      if (!result) {
        return Promise.reject (new Error ('Wrong password'));
      }
      const token = jwt.sign (
        {userName: fetchedUser.userName, userId: fetchedUser._id},
        process.env.JWT_KEY,
        {expiresIn: '1h'}
      );
      res.status (200).json ({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
      });
    })
    .catch (err => {
      return res.status (401).json ({
        message: 'Invalid authentication credentials',
      });
    });
};
