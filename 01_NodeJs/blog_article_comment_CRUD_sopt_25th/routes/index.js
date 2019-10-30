var express = require('express');
var router = express.Router();

router.use('/blog', require('./blog'));

module.exports = router;
