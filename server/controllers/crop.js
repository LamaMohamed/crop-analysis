// Crop model
const Crop = require("../models/crop");

// get all Crops
exports.getAllCrop= (req, res) => { 
    Crop.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
};

// Get single Crop
 exports.getCrop=(req, res) => {
  Crop.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
};
