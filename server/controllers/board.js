const User = require('../models/user');

exports.attack = function(req, res, next) {
  var token = req.header('x-auth');
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    
    let task = {
      name: req.body.name,
      color: req.body.color,
      type: req.body.type,
      goals: req.body.goals
    };
    let date = new Date();

    if (!user.histories[0]) user.histories[0] = { date: date, tasks: [] };
    user.histories[0].tasks.push(task);

    user.save(function(err) {
      if (err) { return next(err); }
      // let history = user.histories[0].toObject();
      // history.date = dh.formattedDate(date);
      let tasks = user.histories[0].tasks;
      res.json(tasks[tasks.length-1]);
    }).catch((e) => {
      res.status(401).send();
    });

  }).catch((e) => {
    res.status(401).send();
  });
};