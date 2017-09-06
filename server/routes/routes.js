'use strict';

const cookieParser = require('cookie-parser');

// const cors = require('cors');

// cors setup 
// var corsOptions = {
//   origin: 'www.anotherdomain.com'
// };

module.exports = function (app) {
    
    // use cookierParser
    app.use(cookieParser());

    // services
    const passport = require('passport');
    require('../services/passport.js'); // this needs to be run but is not directly referenced in this file
    
    // session false as we are not using cookies, using tokens
    const requireAuth = passport.authenticate('jwt', { session: false });
    
    // allow requests from cross origin
    // app.use(cors(corsOptions));
    
    // ---------- VIEWS -------------
    
    // INDEX ROUTES
    app.get('/', function(req, res) {
        res.sendFile(process.cwd() + '/public/html/index.html');
    });
    
    // REACT ROUTES
    // app
    const appRoutes = require('./app_routes');
    app.use('/app', appRoutes);
    
    // ---------- API -------------
    
    // USER ROUTES
    const userRoutes = require('./user_routes');
    app.use('/api/user', userRoutes);
    
    // PROTECTED ROUTES
    // protected route
    app.route('/protected')
        .get(requireAuth, function(req, res) {
            res.send({ message: 'Authenticated' });
        });
};