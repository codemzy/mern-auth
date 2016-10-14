const express = require('express');
const router = express.Router();

// ROUTES -----------------------------------------------------

router.get('/', function(req, res) {
    // TO DO
    // for now just return app, in future, return app if request is authenticated, index if not?
    res.sendFile(process.cwd() + '/public/html/app.html');
});
router.get('/*', function(req, res) {
    // TO DO
    // for now just return app, in future, check auth etc
    res.sendFile(process.cwd() + '/public/html/app.html');
});

module.exports = router;