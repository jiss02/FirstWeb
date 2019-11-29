var express = require('express');
var router = express.Router({mergeParams: true});
const sc = require('../../../module/statusCode');
const au = require('../../../module/authUtil');
const rm = require('../../../module/responseMessage');
const Board = require('../../../model/article');


router.post('/', (req, res)=> {
    const { title, content } = req.body;
    const blog_id = req.params.blog_id;
    if(!title || !content ) {
        res.status(sc.BAD_REQUEST, au.successFalse(rm.NULL_VALUE));
        return;
    }
    Board.create(blog_id, title, content)
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err=>{
        res.status(sc.INTERNAL_SERVER_ERROR, au.successFalse(rm.INTERNAL_SERVER_ERROR));
    });
});

router.get('/', (req, res)=> {
    const blog_id = req.params.blog_id;
    Board.read(blog_id)
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err=>{
        res.status(sc.INTERNAL_SERVER_ERROR, au.successFalse(rm.INTERNAL_SERVER_ERROR));
    });
});

router.put('/', (req, res)=> {
    const { board_id, title, content, blog_password } = req.body;
    Board.update(board_id, title, content, blog_password)
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err=>{
        res.status(sc.INTERNAL_SERVER_ERROR, au.successFalse(rm.INTERNAL_SERVER_ERROR));
    });
});

router.delete('/', (req, res)=> {
    const { board_id, blog_password } = req.body; 
    const blog_id = req.params.blog_id;
    if(!board_id || !blog_password) {
        res.status(sc.BAD_REQUEST,
            au.successFalse(rm.NULL_VALUE));
        return;
    }
    Board.delete(blog_id, board_id, blog_password)
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err=>{
        res.status(sc.INTERNAL_SERVER_ERROR, au.successFalse(rm.INTERNAL_SERVER_ERROR));
    });
});

module.exports = router;