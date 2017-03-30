 var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
var mongoose = require('mongoose');

var CarSchema = mongoose.Schema({
     CrTp:String

    });

var Car = mongoose.model('Car', CarSchema, 'CarTable');




router.get('/crtype', function (req, res,next) {
    console.log("REACHED GET FUNCTION ON SERVER");

    Movie.find({}, function (err, docs) {
         res.json(docs);
         console.log(docs);

    });
});

router.get('/crtype/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Car.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/crtype', function(req, res){
  console.log(req.body);

    var type = req.body.CrTp;

   var Type1 = new Car({

    CrTp:type,

  });


  Type1.save(function(err, docs){
    if ( err ) throw err;
    console.log("Book Saved Successfully");
    res.json(docs);
  });

  })



router.delete('/crtype/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Car.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/crtype/:id', function(req, res){
    console.log("REACHED updation ");
    console.log(req.body);
    Car.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
})

router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = router;
