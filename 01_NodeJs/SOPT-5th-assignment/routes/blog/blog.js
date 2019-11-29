var express = require('express');
var router = express.Router();
const util = require('../../modules/util/util');
const sc = require('../../modules/util/statusCode');
const rm = require('../../modules/util/responseMessage');
const check = require('../../modules/util/nullcheck');
const Blog = require('../../models/Blog');

router.get('/read', (req, res)=>{
    Blog.read()
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err => {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(util.successFalse(rm.INTERNAL_SERVER_ERROR, sc.INTERNAL_SERVER_ERROR));
    })
});

router.use('/', require("../../modules/util/authUtil").LoggedIn);

router.get('/myblog', (req, res)=>{
    const decoded = req.decoded;
    if(!decoded){
        res.status(sc.NO_CONTENT).send(util.successFalse(rm.NO_BLOG, sc.NO_CONTENT));
    }
    Blog.myblog(decoded)
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err => {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(util.successFalse(rm.INTERNAL_SERVER_ERROR, sc.INTERNAL_SERVER_ERROR));
    });
});

router.post('/create', (req, res)=> {
    const decoded = req.decoded;
    const {blogname, describe} = req.body;
    if(!blogname || !describe){
        const miss = check.isnull({title, content});
        res.status(sc.BAD_REQUEST)
        .send(util.successFalse(`${rm.NULL_VALUE} 없는 값은 ${miss} 입니다`, sc.BAD_REQUEST));
    }
    Blog.create({userIdx:decoded, blogname, describe})
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err => {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).send(util.successFalse(rm.INTERNAL_SERVER_ERROR, sc.INTERNAL_SERVER_ERROR));
    })
});

module.exports = router;
