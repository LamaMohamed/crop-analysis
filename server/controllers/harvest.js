// Harvest model
const Harvest = require("../models/harvest");

// POST Harvest
exports.createHarvest= (req, res, next) => {
  const harvest = new Harvest({
    season: req.body.season,
    year:req.body.year,
    city:req.body.city,
    crops:req.body.crops,
  });
  harvest
     .save()
     .then(result => {
    console.log(result);
    res.status(201).json({
      message: "data saved successfully!",
        id: result._id
    })   
  })
  .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: "data not saved!!"
                });
            });
}

exports.getAllHarvest= (req, res) => { 
  Harvest.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
};

// Get single Harvest
 exports.getHarvest=(req, res) => {
  Harvest.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
}


// Delete harvest
exports.deleteHarvest= (req, res, next) => {
  Harvest.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
};
