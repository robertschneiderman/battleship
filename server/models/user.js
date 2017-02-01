const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const Mixed = Schema.Types.Mixed;

const config = require('../environment');

  // games: [
  //     {
  //         boards: {rows: []},
  //         winner: {type: String, default: null}

  //     }
  // ]

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  name: String,
  password: String,
  games: [{
    start: {type: Boolean, default: true},
    turn: {type: Number, default: 0},
    winner: {type: String, default: null},
    boards: [
      {
        ships: [
          {
            capacity: Number,
            coordinates: { type: Mixed, default: [] },
            hits: {type: Number, default: 0},
            name: String,
            vertical: Boolean
          }
        ],
        grid: { type: Mixed, default: [] }
      }
    ]
  }]
});

// userSchema.pre('save', function(next) {
//   const user = this;
//   bcrypt.genSalt(10, function(err, salt) {
//     if(err) { return next(err); }

//     bcrypt.hash(user.password, salt, null, function(err, hash) {
//       if(err) { return next(err); }

//       user.password = hash;
//       next();
//     });
//   });
// });

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

userSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  decoded = jwt.decode(token, config.secret);

  try {
    decoded = jwt.decode(token, config.secret);
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded.sub,
  });
};

const modelClass = mongoose.model('user', userSchema);

module.exports = modelClass;