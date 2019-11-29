var express = require('express');
var router = express.Router({ mergeParams: true });

router.get('/', (req, res)=> {

});

router.get('/:boradIdx', (req, res)=> {

});


router.use('/', require("../../modules/util/authUtil").LoggedIn);
router.post('/', (req, res)=> {

});

router.put('/:boardIdx', (req, res)=> {

});

router.delete('/:boardIdx', (req, res)=>{

});

module.exports = router;
