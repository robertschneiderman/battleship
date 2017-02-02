const Authentication = require('./controllers/authentication');
const User = require('./controllers/user');
const Board = require('./controllers/board');
const Game = require('./controllers/games');

const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.send('SUCESS!');
    });

    app.post('/signup', Authentication.signup);
    app.post('/signin', Authentication.signin);

    app.get('/users/:id', User.find);    

    app.post('/games', Game.new);

    app.patch('/boards', Board.attack);
    
};