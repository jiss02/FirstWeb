var express = require('express');
var router = express.Router();

// router.use('/:blogIdx/article', require('./article'));
router.use('/', require('./blog'));
router.use('/:blog_id/article', require('./article'));

module.exports = router;
