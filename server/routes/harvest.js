const express = require("express");

const HarvestController = require("../controllers/harvest");

const router = express.Router();

router.post("/add-harvest", HarvestController.createHarvest);

router.get("/", HarvestController.getAllHarvest);

router.get("/read-harvest/:id",HarvestController.getHarvest);

router.delete("/delete-harvest/:id",HarvestController.deleteHarvest);

module.exports = router;