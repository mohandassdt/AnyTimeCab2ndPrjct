var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
var mongoose = require('mongoose');

var driverSchema = mongoose.Schema({
    Did:String,
    name:String,
    age:String,
   licence:String,
   Car:String,
  carNo:String,
  type:String,
   Mobile:String

   });

var Driver = mongoose.model('Driver', driverSchema, 'DriverTable');




router.get('/drive', function (req, res,next) {
   console.log("REACHED GET FUNCTION ON SERVER");

   Driver.find({}, function (err, docs) {
        res.json(docs);
        console.log(docs);

   });
});

router.get('/drive/:id', function (req, res) {
   console.log("REACHED GET ID FUNCTION ON SERVER");
    Driver.find({_id: req.params.id}, function (err, docs) {
        res.json(docs);

   });
});

router.post('/drive', function(req, res){
 console.log(req.body);

   var Idno = req.body.Did;
   var dname = req.body.name;
   var dage = req.body.age;
   var dcar = req.body.Car;
   var dcarNo = req.body.carNo;
   var dlicence = req.body.licence;
   var dMobile = req.body.Mobile;
   var dtype = req.body.type;



  var driver1 = new Driver({

   Did:Idno,
   name:dname,
   age:dage,
   Car:dcar,
   carNo:dcarNo,
  licence:dlicence,
  type:dtype,
  Mobile:dMobile

 });


 driver1.save(function(err, docs){
   if ( err ) throw err;
   console.log("Book Saved Successfully");
   res.json(docs);
 });

 })



router.delete('/drive/:id', function(req, res){
  console.log("REACHED Delete FUNCTION ON SERVER");
     Driver.remove({_id:req.params.id}, function(err, docs){
       res.json(docs);
   });
})

router.put('/drive/:id', function(req, res){
   console.log("REACHED updation ");
   console.log(req.body);
   Driver.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
     res.json(data);
   });
})

router.use(function(req, res, next) {
 var err = new Error('Not Found');
 err.status = 404;
 next(err);
});


module.exports = router;
