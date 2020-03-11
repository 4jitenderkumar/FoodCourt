var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    name: {type: String, default: ''},
    image: {type: String, default: ''},
    username: {type: String, default: ''},
    password: {type: String, default: ''},
    contactNumber: {type: String, default: ''},
    wallet: {type: String, default: ''}, //0
    isAdmin: {type: String, default: ''}, // 0 or 1 //related to admin
    isClosed: {type: String, default: ''}, // 0 or 1 //food court is closed or not //related to admin

    historyOfOrders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food'
    }]
});

// userSchema.methods.encryptPassword = (password) => {
//      return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
// }

// userSchema.methods.validPassword   = function(password){    
//      return bcrypt.compareSync(password, this.password);
// }

module.exports = mongoose.model('User', userSchema);