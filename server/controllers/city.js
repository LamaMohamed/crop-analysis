// City model
const City = require("../models/city");

// get all Cities
exports.getAllCities= (req, res) => { 
   City.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
};

// Get single City
 exports.getCity=(req, res) => {
 City.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
};
