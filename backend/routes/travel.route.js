const express = require ('express');
const router = express.Router ();
const travelController = require ('../controllers/travel.controller');

router.get ('/cities', travelController.cities);
router.post ('/addCity', travelController.addCity);

module.exports = router;
