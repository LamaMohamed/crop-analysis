var City= require ('../models/city');
var mongoose = require('mongoose');

mongoose
  .connect(
    "mongodb+srv://Lama:Lama1011@crop-analysis.temcm.mongodb.net/CropAnalysisDB"
  );

var cities = [
    new City({
    name:"Giza",
    coordinates:{"latitude":"29.976480","longitude":"31.131302"}
}),
new City({
    name:"Alex",
    coordinates:{"latitude":"31.205753","longitude":"29.924526"}
}),
new City({
    name:"Soybean",
    coordinates:{"latitude":"","longitude":""}
}),
new City({
    name:"Faiyum",
    coordinates:{"latitude":"29.212879","longitude":"30.442699"}
}),
new City({
    name:"Sohag",
    coordinates:{"latitude":"26.549999","longitude":"31.700001"}
}),
new City({
    name:"Assiut",
    coordinates:{"latitude":"27.180134","longitude":"31.189283"}
}),
new City({
    name:"Mansoura",
    coordinates:{"latitude":"31.037933","longitude":"31.381523"}
}),
new City({
    name:"Luxor",
    coordinates:{"latitude":"25.687243","longitude":"32.639637"}
}),
];

var flag=0;
for(var i=0;i<cities.length;i++){
   cities[i].save(() => {
       flag++;
        if(flag === cities.length){
            exit();
        }
   })
}

function exit(){
     mongoose.disconnect();
}