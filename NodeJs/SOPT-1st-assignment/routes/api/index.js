var express = require('express');
var router = express.Router();

router.use('/news', require('./news'));
router.use('/cafe', require('./cafe'));
router.use('/blog', require('./blog'));
router.get('/', (req, res) => {
    res.send("API페이지 입니다.");
});

module.exports = router;