const express = require("express");

const CityController = require("../controllers/city");

const router = express.Router();


router.get("/", CityController.getAllCities);

router.get("/read-city/:id", CityController.getCity);

module.exports = router;