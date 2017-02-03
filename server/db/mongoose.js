const mongoose = require('mongoose');

// DB Setup
mongoose.Promise = global.Promise;
var env = process.env.NODE_ENV || 'development';
    mongoose.connect('mongodb://localhost/battleship');
if (env === 'development') {
} else {
    mongoose.connect('mongodb://heroku_z0p79sc8:u408971i0bgdka4ban6efmrifo@ds139969.mlab.com:39969/heroku_z0p79sc8');
}


module.exports = { mongoose };