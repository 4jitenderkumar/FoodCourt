var User = require('../models/user');
var Food = require('../models/food');

var objectId = require('mongodb').ObjectID;

var multer = require('multer')

var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, 'public/Upload/Profile/');
    },
    filename: function (request, file, callback) {
        console.log(file);
        callback(null, file.originalname)
    }
});

var upload = multer({ storage: storage });

module.exports = (app, passport) => {

    app.get('/admin/addFood', (req, res, next) =>{//http method, Gets information
        var success = req.flash('success');
        res.render('admin/addFood.ejs', {title: 'Add Food', user: req.user, success: success, noErrors: success.length > 0});  
        
    });

    app.post('/admin/addFood', upload.single('image'), (req, res, next) =>{//http method, Gets information        
        var newFood = new Food();
        newFood.name = req.body.name;
        newFood.price = req.body.price;
        newFood.description = req.body.description;
        newFood.isNonVeg = req.body.isNonVeg;//WARNING *******************
        newFood.image = req.file.originalname;
        newFood.isAvailable = '1';

        newFood.save((err) => {
            if(err){
                console.log(err);
            }else{
                console.log(newFood);
            }
        });

        req.flash('success', 'Food has been added');
        res.redirect('/admin/addFood');
    });

    app.get('/admin/wallet/:id', (req, res, next) =>{//http method, Gets information
        
        console.log(req.params.id)
        User.findOne({"username":req.params.id}, (err, data) => {
            if(err) {
                console.log(err);
            }
            console.log(data);

            if(data) {
                res.json({"exists": 1, "wallet": data.wallet});
            }
            else {
                res.json({"exists": 0});
            }
          
        });
    });
    

}