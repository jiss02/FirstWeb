var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send("라이크페이지 입니다.");
});

module.exports = router;