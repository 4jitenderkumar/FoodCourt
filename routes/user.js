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
    app.get('/', (req, res, next) =>{
        if(req.session.cookie.originalMaxAge){
            res.redirect('/home');
            console.log('session exists');
        }else{
            var errors = req.flash('error');
            console.log(errors);
            res.render('user/login.ejs', {title: 'Login', messages: errors, hasErrors: errors.length > 0});  
        } 
    });

    app.post('/' , passport.authenticate('local.login', {
        failureRedirect: '/',
        failureFlash   : true
    }), (req, res) => {
            console.log('Successfully logged in');
            req.session.cookie.maxAge = 30*24*60*60*1000; // 30 days 
            res.redirect('/home'); 
    });

    app.get('/home', (req, res, next) =>{//http method, Gets information

        if(req.user.isAdmin == '0'){
            res.redirect('/user/home'); 
        }else {
            res.redirect('/admin/home');
        }    
    });

    app.get('/user/home', (req, res, next) =>{//http method, Gets information

        res.render('user/home.ejs', {title: 'Home', user: req.user});  
     
    });

    app.get('/admin/home', (req, res, next) =>{//http method, Gets information

        res.render('admin/home.ejs', {title: 'Home', user: req.user});  
     
    });

    app.get('/user/cart', (req, res, next) =>{//http method, Gets information

        res.render('user/cart.ejs', {title: 'Cart', user: req.user});  
     
    });

    app.get('/admin/orders', (req, res, next) =>{//http method, Gets information

        res.render('admin/orders.ejs', {title: 'Orders', user: req.user});  
     
    });

    app.get('/user/history', (req, res, next) =>{//http method, Gets information

        res.render('user/history.ejs', {title: 'History', user: req.user});  
     
    });

    app.get('/admin/wallet', (req, res, next) =>{//http method, Gets information

        res.render('admin/wallet.ejs', {title: 'Wallet', user: req.user});  
     
    });

    app.post('/admin/wallet', (req, res, next) =>{//http method, Gets information
            console.log('username = ' + req.body.username);
        User.findOne({"username":req.body.username}, (err, data) => {
            if(err) {
                console.log(err);
            }
            console.log(data + 'hi');
            User.updateOne(
                { "username": req.body.username}, 
                { $set:
                   {
                    "wallet": req.body.wallet
                   }
                },(err, result) => {
                   if(err){
                    console.log("ERRORERROR" + err);
                   }
                   else {
                    // console.log(result);
                    console.log('Money has been added');
                   }
                   //else
                  // console.log(result);
                }
             )
        }); 
       

        req.flash('success', 'Money has been added');
        res.redirect('/admin/wallet');
    });

    


    app.get('/changePassword', (req, res, next) =>{//http method, Gets information
        var error = req.flash('error');//#messages = errors
        var success = req.flash('success');
        console.log(error);
        res.render('user/changePassword.ejs', {title: 'changePassword', messages: error, hasErrors: error.length > 0, success: success, noErrors: success.length > 0, user: req.user});
         
    });

    app.post('/changePassword', (req, res, next) =>{//http method, Gets information

        if(req.user.password != req.body.oldPassword){

            req.flash('error','oldPassword is incorrect');
            res.redirect('/changePassword');
        }else if(req.body.oldPassword == req.body.newPassword){
            req.flash('error','oldPassword and newPassword cannot be same.');
            res.redirect('/changePassword');
        }
        else{
            // all set now SAVE
            User.updateOne(
                { "_id": objectId(req.user._id)}, 
                { $set:
                    {
                    "password" :  req.body.newPassword,
                    }
                },(err, result) => {
                    if(err)
                    console.log("ERRORERROR" + err);
                    else{
                    console.log("Password is updated");

                    req.flash('success','Password is Updated' );
                    res.redirect('/changePassword');
                }

                }
            )
                
            }
         
    });

    app.get('/logout', (req, res) => {
        req.logout();//method available through passport, CLEARS THE LOGIN SESSION, REMOVES THE req.user PROPERTY

        req.session.destroy((err) => {
            //path where user to be taken to after user is successfully logout
            res.redirect('/');
        })
    }); 

}
