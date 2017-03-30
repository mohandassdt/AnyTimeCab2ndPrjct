
var logger = require('morgan');
var express = require('express');
var app = express();
var bodyParser=require('body-parser');
var UserRoute = require('./routes/usercrud.js');
var routes = require('./routes/Cartype-crud');
var routesDriver = require('./routes/driver-crud');
var routesCity1 = require('./routes/cityName-crud');
var routesBooking = require('./routes/bookCab-crud');
var routesConfimation = require('./routes/cnfrm-crud');



app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.use('/crtype', routes);
app.use('/drive', routesDriver);
app.use('/ctyNa', routesCity1);
app.use('/bkc', routesBooking);
app.use('/cnfm', routesConfimation);



app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});



var mongo = require('mongodb');
var mongoose = require('mongoose');

var dbHost = 'mongodb://localhost:27017/cabTest';
mongoose.connect(dbHost);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log("Connected to DB");
});


db.on('error', function(err) {
    console.log(err);
});
app.use('/api', UserRoute);


// Only load this middleware in dev mode (important).
if (app.get('env') === 'development') {
  var webpackMiddleware = require("webpack-dev-middleware");
  var webpack = require('webpack');

  var config = require('./webpack.config');

  app.use(webpackMiddleware(webpack(config), {
    publicPath: "/build",

    headers: { "X-Custom-Webpack-Header": "yes" },

    stats: {
      colors: true
    }
  }));

}



var server = app.listen(3000, function () {
  console.log('listening on port 3000');
});
