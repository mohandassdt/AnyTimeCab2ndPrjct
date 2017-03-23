'use strict';

var app = require('angular').module('movieApp');

app.controller('BookingController', require('./bookingController'));
app.controller('HomeController', require('./homeController'));
app.controller('CabBookController', require('./cabBookController'));
app.controller('ConfirmationController', require('./confirmationController'));
