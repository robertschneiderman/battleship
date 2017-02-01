const Authentication = require('./controllers/authentication');
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
    app.post('/signup', Authentication.signup);    

    app.patch('/board', requireSignIn, Board.attack);
    
};