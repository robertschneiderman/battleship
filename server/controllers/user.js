const User = require('../models/user');

exports.find = function(req, res, next) {

  User.findById(req.params.id).then(user => {
    User.findById(user.buddy).then(buddy => {
        res.json({ users: [user] });
    }).catch((e) => {
      res.status(401).send();
    });
  }).catch((e) => {
    res.status(401).send();
  });
};