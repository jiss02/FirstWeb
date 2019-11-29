var express = require('express');
var router = express.Router({ mergeParams: true });
const util = require('../../../modules/util/util');
const sc = require('../../../modules/util/statusCode');
const rm = require('../../../modules/util/responseMessage');
const check = require('../../../modules/util/nullcheck');
const Board = require('../../../models/Board');

router.get('/', (req, res)=>{
    const blogIdx = req.params.blogIdx;
    Board.read(blogIdx)
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err => {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(util.successFalse(rm.INTERNAL_SERVER_ERROR, sc.INTERNAL_SERVER_ERROR));
    })
});

router.get('/:boardIdx', (req, res)=>{
    const {blogIdx, boardIdx} = req.params;
    Board.readOne(blogIdx, boardIdx)
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err => {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(util.successFalse(rm.INTERNAL_SERVER_ERROR, sc.INTERNAL_SERVER_ERROR));
    });
});

router.use('/', require("../../../modules/util/authUtil").LoggedIn);
router.post('/', (req, res)=> {
    const decoded = req.decoded;
    const blogIdx = req.params.blogIdx;
    const {title, content, imgs} = req.body;
    if(!title || !content || !imgs){
        const miss = check.isnull({title, content, imgs});
        res.status(sc.BAD_REQUEST)
        .send(util.successFalse(`${rm.NULL_VALUE} 없는 값은 ${miss} 입니다`, sc.BAD_REQUEST));
    }
    Board.create({decoded, blogIdx ,title, content, imgs})
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err => {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(util.successFalse(rm.INTERNAL_SERVER_ERROR, sc.INTERNAL_SERVER_ERROR));
    })
});

router.put('/:boardIdx', (req, res)=> {
    const decoded = req.decoded;
    const {blogIdx, boardIdx} = req.params;
    const {title, content, imgs} = req.body;
    if(!title || !content || !imgs){
        const miss = check.isnull({title, content, imgs});
        res.status(sc.BAD_REQUEST)
        .send(util.successFalse(`${rm.NULL_VALUE} 없는 값은 ${miss} 입니다`, sc.BAD_REQUEST));
    }
    Board.update({decoded, blogIdx, boardIdx, title, content, imgs})
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err=>{
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(util.successFalse(rm.INTERNAL_SERVER_ERROR,sc.INTERNAL_SERVER_ERROR));
    });
});

router.delete('/:boardIdx', (req, res)=>{
    const decoded = req.decoded;
    const {blogIdx, boardIdx} = req.params;
    Board.delete(decoded, blogIdx, boardIdx)
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err=>{
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(util.successFalse(rm.INTERNAL_SERVER_ERROR,sc.INTERNAL_SERVER_ERROR));
    });
});
module.exports = router;
