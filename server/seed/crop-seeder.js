var Crop= require ('../models/crop');
var mongoose = require('mongoose');

mongoose
  .connect(
    "mongodb+srv://Lama:Lama1011@crop-analysis.temcm.mongodb.net/CropAnalysisDB"
  )
var crops = [
    new Crop({
    name:"Rice",
    season:"Kharif"
}),
new Crop({
    name:"Cotton",
    season:"Kharif"
}),
new Crop({
    name:"Soybean",
    season:"Kharif"
}),
new Crop({
    name:"Wheat",
    season:"Rabi"
}),
new Crop({
    name:"Oats",
    season:"Rabi"
}),
new Crop({
    name:"Mustard",
    season:"Rabi"
}),
new Crop({
    name:"Cucumber",
    season:"Zaid"
}),
new Crop({
    name:"Watermelon",
    season:"Zaid"
}),
new Crop({
    name:"Pumpkin",
    season:"Zaid"
}),
];

var flag=0;
for(var i=0;i<crops.length;i++){
   crops[i].save((err,result) => {
       flag++;
        if(flag === crops.length){
            exit();
        }
   })
}

function exit(){
     mongoose.disconnect();
}