var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
   name: {type:String, requird:true},
   coordinates: {type:Object, requird:true}
});

module.exports= mongoose.model('City',schema,'City');