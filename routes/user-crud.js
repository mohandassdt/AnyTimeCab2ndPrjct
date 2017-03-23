var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST

router.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  UserID:String,
  UserName:String,
  MobileNo:Number,
  MailId:String
  // showTimemodel:String,

 });
var User = mongoose.model('User',UserSchema,'userTable');


router.get('/use', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    User.find({}, function (err, docs) {
         res.json(docs);

    });
});

router.get('/use/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON dass SERVER");
     User.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/use', function(req, res){
  console.log(req.body);
  var id = req.body.UserID;
  var name = req.body.UserName;
  var mob=req.body.MobileNo;
  var mail=req.body.MailId;
var user1 = new User({
  UserID:id,
  UserName:name,
  MobileNo:mob,
  MailId:mail

});

  user1.save(function(err, docs){
    if ( err ) throw err;
    console.log("theater Saved Successfully");
    res.json(docs);
  });

  })

router.delete('/use/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      User.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/use/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    User.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



module.exports = router;
