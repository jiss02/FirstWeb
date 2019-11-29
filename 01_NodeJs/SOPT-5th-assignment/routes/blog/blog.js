var express = require('express');
var router = express.Router();
const util = require('../../modules/util/util');
const sc = require('../../modules/util/statusCode');
const rm = require('../../modules/util/responseMessage');
const Blog = require('../../models/Blog');

router.use('/', require("../../modules/util/authUtil").LoggedIn);

router.post('/middleware', (req, res)=>{
    console.log(req.decoded);
    res.json(req.decoded);
});

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

router.get('/myblog', (req, res)=>{
    const decoded = req.decoded;
    if(!decoded){
        res.status(sc.NO_CONTENT).send(util.successFalse(rm.NOT_LOGIN, sc.NO_CONTENT));
    }
    Blog.myblog(decoded)
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err => {
        res.status(sc.INTERNAL_SERVER_ERROR).send(util.successFalse(rm.INTERNAL_SERVER_ERROR, sc.INTERNAL_SERVER_ERROR));
    })
});

module.exports = router;
