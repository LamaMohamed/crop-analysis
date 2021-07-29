var City= require ('../models/city');
var mongoose = require('mongoose');

mongoose
  .connect(
    "mongodb+srv://Lama:Lama1011@crop-analysis.temcm.mongodb.net/CropAnalysisDB",
      {
        useNewUrlParser: true,
        useFindAndModify: false
      }
  ).then(client => {
      let db = client.db();
  });

  
var harvests = [
    new Harvest({
    season:"summer",
    year:2018,
    city:"",
    crops:[]
}),
new Harvest({
    season:"winter",
    year:2015,
    city:"",
    crops:[]
}),
];

var flag=0;
for(var i=0;i<harvests.length;i++){
   harvest[i].save(() => {
       flag++;
        if(flag === harvests.length){
            exit();
        }
   })
}

function exit(){
     mongoose.disconnect();
}