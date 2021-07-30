const express = require("express");

const CropController = require("../controllers/crop");

const router = express.Router();

router.get("/", CropController.getAllCrop);

router.get("/read-crop/:id", CropController.getCrop);


module.exports = router;