const jwt = require ('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    decodedToken = jwt.verify (token, process.env.JWT_KEY);

    req.userId = decodedToken.userId;

    console.log (req.userId);

    next ();
  } catch (error) {
    res.status (401).json ({
      message: 'Authentication failed',
    });
  }
};
