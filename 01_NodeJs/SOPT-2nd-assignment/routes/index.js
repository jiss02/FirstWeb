var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/api', require('./api'));
router.get('/', (req, res, next) => {
  res.send('홈입니다.');
});

module.exports = router;
