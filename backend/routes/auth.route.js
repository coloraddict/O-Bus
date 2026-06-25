const express = require ('express');
const authController = require ('../controllers/auth.controller');
const router = express.Router ();
const checkAuth = require ('../middleware/check-auth');

router.post ('/register', authController.register);

router.post ('/login', authController.login);

router.put ('/travellers/:userId', checkAuth, authController.saveTravellers);

module.exports = router;
