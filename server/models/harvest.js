var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
   season: {type:String, requird:true},
   year: {type:Number, requird:true},
   city: {type:mongoose.Schema.Types.ObjectId, requird:true},
   crops: {type:Array, requird:true},
});

module.exports= mongoose.model('Harvest',schema,"Harvest");