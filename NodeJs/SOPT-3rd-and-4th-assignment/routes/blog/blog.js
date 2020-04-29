var express = require('express');
var router = express.Router();
const au = require('../../module/authUtil');
const sc = require('../../module/statusCode');
const rm = require('../../module/responseMessage');
const Blog = require('../../model/blog');


router.get('/', (req, res)=> {
    Blog.read()
    .then(({code, json})=> {
        res.status(code).send(json);
    })
    .catch(err => {
        res.status(sc.INTERNAL_SERVER_ERROR, au.successFalse(rm.INTERNAL_SERVER_ERROR));
    })
});

router.post('/', (req, res)=> {
    const {username, blogname, describe, password} = req.body;
    if(!username || !blogname || !describe || !password) {
        res.status(sc.BAD_REQUEST, au.successFalse(rm.NULL_VALUE));
        return;
    }
    Blog.create(username, blogname, describe, password)
    .then(({code, json})=> {
        res.status(code).send(json);
    })
    .catch(err => {
        res.status(sc.INTERNAL_SERVER_ERROR, au.successFalse(rm.INTERNAL_SERVER_ERROR));
    })
});

router.put('/', (req, res)=> {
    const {blog_id, username, blogname, describe, password, new_password} = req.body;
    if(!blog_id || !username || !blogname || !describe || !password || !new_password) {
        res.status(sc.BAD_REQUEST, au.successFalse(rm.NULL_VALUE));
        return;
    }
    Blog.update(blog_id, username, blogname, describe, password, new_password)
    .then(({code, json})=> {
        res.status(code).send(json);
    })
    .catch(err => {
        res.status(sc.INTERNAL_SERVER_ERROR, au.successFalse(rm.INTERNAL_SERVER_ERROR));
    });
});  

router.delete('/', (req, res)=> {
    const {blog_id, password} = req.body;
    if (!blog_id || !password) {
        res.status(sc.BAD_REQUEST,
            au.successFalse(rm.NULL_VALUE));
        return;
    }
    Blog.delete(blog_id, password)
    .then(({code, json})=> {
        res.status(code).send(json);
    })
    .catch(err => {
        res.status(sc.INTERNAL_SERVER_ERROR, au.successFalse(rm.INTERNAL_SERVER_ERROR));
    });
});

module.exports = router;
