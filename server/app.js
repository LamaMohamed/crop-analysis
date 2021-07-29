const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user");

const app = express();
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://Lama:Lama1011@crop-analysis.temcm.mongodb.net/CropAnalysisDB",
      {
        useNewUrlParser: true,
        useFindAndModify: false
      }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Setting up static directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
    next();
  });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','index.html'));
  });
  
  
  // error handler 
  app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
  });

  // PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Connected to port ' + port)
})
  
app.use("/api/user", userRoutes);

module.exports = app;