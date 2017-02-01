const jwt = require('jwt-simple');
const User = require('../models/user');

const config = require('../environment');
const bcrypt = require('bcrypt-nodejs');

const helpers = require('../board_helpers');
const boats = helpers.boats;
const boatsCopy = helpers.boatsCopy;
const randomAssignment = helpers.randomAssignment;
const populateGrid = helpers.populateGrid;

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  res.send({ token: tokenForUser(req.user), user: {id: req.user.id, email: req.user.email} });
};

exports.signup = function(req, res, next) {
  let email = req.body.email;
  let name = req.body.name;
  let password = req.body.password;

  if (!email || !password) {
    res.status(422).send({ error: "You must provide email and password" });
  }

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use'} );
    }

    randomAssignment(boats);
    randomAssignment(boatsCopy);

    let grid1 = populateGrid(boats);
    let grid2 = populateGrid(boatsCopy); 

    const user = new User({
      email: email,
      password: password,
      name,
      game: {
        boards: [{grid: grid1, boats}, {grid: grid2, boats: boatsCopy}]
      }
    });

    bcrypt.genSalt(10, function(err, salt) {
      if(err) { return next(err); }

      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if(err) { return next(err); }

        user.password = hash;

        user.save(function(err) {
          if(err) { return next(err); }
          
          res.json({ token: tokenForUser(user), user });
        });


      });
    });    

      
  });
};