const Authentication = require('./controllers/authentication');
const User = require('./controllers/user');
const Board = require('./controllers/board');

const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.send('SUCESS!');
    });

    app.post('/signin', requireSignIn, Authentication.signin);
    app.post('/signin', requireSignIn, Authentication.signin);

    app.get('/users/:id', User.find);    

    app.patch('/board', requireSignIn, Board.attack);
    
};