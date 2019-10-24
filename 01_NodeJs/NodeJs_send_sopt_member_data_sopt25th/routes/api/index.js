var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/group', require('./group'));
router.use('/mixer', require('./mixer'));
router.get('/', function(req, res, next) {
  res.send('api홈입니다.');
});

module.exports = router;