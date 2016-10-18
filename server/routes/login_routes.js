const express = require('express');
const router = express.Router();

// ROUTES -----------------------------------------------------

router.get('/', function(req, res) {
    res.sendFile(process.cwd() + '/public/html/login.html');
});

router.get('/*', function(req, res) {
    res.sendFile(process.cwd() + '/public/html/login.html');
});

module.exports = router;