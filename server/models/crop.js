var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
   name: {type:String, requird:true},
   season: {type:String, requird:true}
},
);

module.exports= mongoose.model('Crop',schema,'Crops');