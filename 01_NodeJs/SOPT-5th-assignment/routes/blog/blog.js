var express = require('express');
var router = express.Router({ mergeParams: true });
const util = require('../../modules/util/util');
const sc = require('../../modules/util/statusCode');
const rm = require('../../modules/util/responseMessage');
const check = require('../../modules/util/nullcheck');
const Blog = require('../../models/Blog');

router.get('/', (req, res)=>{
    Blog.read()
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err => {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(util.successFalse(rm.INTERNAL_SERVER_ERROR, sc.INTERNAL_SERVER_ERROR));
    })
});

router.get('/:blogIdx', (req, res)=>{
    const blogIdx = req.params.blogIdx;
    Blog.readOne(blogIdx)
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err => {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(util.successFalse(rm.INTERNAL_SERVER_ERROR, sc.INTERNAL_SERVER_ERROR));
    });
});

router.use('/', require("../../modules/auth/authUtil").LoggedIn);
router.post('/', (req, res)=> {
    const decoded = req.decoded;
    const {blogname, summary} = req.body;
    if(!blogname || !summary){
        const miss = check.isnull({title, content});
        res.status(sc.BAD_REQUEST)
        .send(util.successFalse(`${rm.NULL_VALUE} 없는 값은 ${miss} 입니다`, sc.BAD_REQUEST));
    }
    Blog.create({userIdx:decoded, blogname, summary})
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err => {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(util.successFalse(rm.INTERNAL_SERVER_ERROR, sc.INTERNAL_SERVER_ERROR));
    })
});

router.put('/:blogIdx', (req, res)=> {
    const decoded = req.decoded;
    const blogIdx = req.params.blogIdx;
    const {blogname, summary} = req.body;
    if(!blogname || !summary){
        const miss = check.isnull({title, content});
        res.status(sc.BAD_REQUEST)
        .send(util.successFalse(`${rm.NULL_VALUE} 없는 값은 ${miss} 입니다`, sc.BAD_REQUEST));
    }
    Blog.update({userIdx:decoded, blogIdx:blogIdx, blogname, summary})
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err=>{
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(util.successFalse(rm.INTERNAL_SERVER_ERROR,sc.INTERNAL_SERVER_ERROR));
    });
});

router.delete('/:blogIdx', (req, res)=>{
    const decoded = req.decoded;
    const blogIdx = req.params.blogIdx;
    Blog.delete(decoded, blogIdx)
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err=>{
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(util.successFalse(rm.INTERNAL_SERVER_ERROR,sc.INTERNAL_SERVER_ERROR));
    });
});

module.exports = router;
