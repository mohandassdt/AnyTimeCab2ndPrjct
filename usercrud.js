var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
// var jwt = require('jsonwebtoken');

router.post('/signup', function(req, res) {
    var newUser = new User();
    newUser.name = req.body.name;
    // newUser.LastName = req.body.LastName;
    newUser.mobile = req.body.mobile;
    newUser.email = req.body.email;
    newUser.Password = newUser.generateHash(req.body.Password);
    newUser.save(function(err) {
        if (err) {
            res.json(err);
        } else {
            res.json({
                success: true
            });
            console.log('Signup API Called');
        }
    });
});

router.post('/login', function(req, res) {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) {
            res.json(err);
        } else if (!user) {
            res.json({
                success: false,
                message: 'Sorry wrong email id'
            });
            console.log('Wrong Email');
        } else if (!user.validPassword(req.body.Password)) {
            res.json({
                success: false,
                message: 'Sorry wrong password'
            });
            console.log('Wrong Password');
        } else if (user) {
            var token = jwt.sign(user, 'thisismysecret', {
                expiresIn: 1400
            });
            res.json({
                success: true,
                token: token,
                isLoggedIn: true,
                userDetail: user
            });
            console.log(token);
            console.log('Toke Created');
        }
    });
});

module.exports = router;
