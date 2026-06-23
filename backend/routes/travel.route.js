const express = require ('express');
const router = express.Router ();
const travelController = require ('../controllers/travel.controller');

router.get ('/cities', travelController.cities);
router.post ('/addCity', travelController.addCity);
router.post ('/matrix', travelController.getDuration);

module.exports = router;
