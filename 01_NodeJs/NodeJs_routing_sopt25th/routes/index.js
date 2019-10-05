var express = require('express');
var router = express.Router();

router.use('/api', require('./api'));
router.get('/', (req, res) => {
  res.send("홈페이지 입니다.");
});

module.exports = router;
