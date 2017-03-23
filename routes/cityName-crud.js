var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
var mongoose = require('mongoose');

var CitySchema = mongoose.Schema({
    cityname:String

   });

var City = mongoose.model('City', CitySchema, 'CityTable');




router.get('/ctyNa', function (req, res,next) {
   console.log("REACHED GET FUNCTION ON CITY SERVER");

   City.find({}, function (err, docs) {
        res.json(docs);
        console.log(docs);

   });
});

router.get('/ctyNa/:id', function (req, res) {
   console.log("REACHED GET ID FUNCTION ON CITY SERVER");
    City.find({_id: req.params.id}, function (err, docs) {
        res.json(docs);

   });
});

router.post('/ctyNa', function(req, res){
 console.log(req.body);

   var CNme = req.body.cityname;

  var city1 = new City({

   cityname:CNme

 });


 city1.save(function(err, docs){
   if ( err ) throw err;
   console.log("city Saved Successfully");
   res.json(docs);
 });

 })



router.delete('/ctyNa/:id', function(req, res){
  console.log("REACHED Delete FUNCTION ON SERVER");
     City.remove({_id:req.params.id}, function(err, docs){
       res.json(docs);
   });
})

router.put('/ctyNa/:id', function(req, res){
   console.log("REACHED updation ");
   console.log(req.body);
   City.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
     res.json(data);
   });
})

router.use(function(req, res, next) {
 var err = new Error('Not Found');
 err.status = 404;
 next(err);
});


module.exports = router;
