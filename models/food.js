
var mongoose = require('mongoose');

var foodSchema = mongoose.Schema({
    name: {type: String, default: ''}, 
    image: {type: String, default: ''},
    description: {type: String, default: ''},
    price: {type: String, default: ''},
    isNonVeg: {type: String, default: ''}, // 1 or 0
    isAvailable: {type: String, default: ''} // 1 0r 0

});

module.exports = mongoose.model('Food', foodSchema);
