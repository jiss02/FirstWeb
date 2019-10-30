var express = require('express');
var router = express.Router({mergeParams: true});

router.use('/', require('./article'));
router.use('/:board_id/comment', require('./comment'));

module.exports = router;