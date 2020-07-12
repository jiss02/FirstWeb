var express = require('express');
var router = express.Router({ mergeParams: true });

router.use('/:blogIdx/board', require('./board'));
router.use('/', require('./blog'));

module.exports = router;
