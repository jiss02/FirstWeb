var express = require('express');
var router = express.Router({ mergeParams: true });

router.use('/', require('./blog'));
router.use('/:blogIdx/board', require('./board'));

module.exports = router;
