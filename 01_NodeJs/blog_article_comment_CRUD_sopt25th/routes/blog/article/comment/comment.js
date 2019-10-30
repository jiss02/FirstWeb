var express = require('express');
var router = express.Router({mergeParams: true});
const sc = require('../../../../module/statusCode');
const au = require('../../../../module/authUtil');
const rm = require('../../../../module/responseMessage');
const Comment = require('../../../../model/comment');

router.post('/', (req, res)=>{
    const {name, password, comment} = req.body;
    const board_id = req.params.board_id;
    
    if(!name || !password || !comment) {
        res.status(sc.BAD_REQUEST, au.successFalse(rm.NULL_VALUE));
        return;
    }
    Comment.create(board_id, name, password, comment)
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err => {
        res.status(sc.INTERNAL_SERVER_ERROR, au.successFalse(rm.INTERNAL_SERVER_ERROR));
    });
    
})

router.get('/', (req, res)=>{
    const board_id = req.params.board_id;
    Comment.read(board_id)
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err => {
        res.status(sc.INTERNAL_SERVER_ERROR, au.successFalse(rm.INTERNAL_SERVER_ERROR));
    });
})

router.put('/', (req, res)=> {
    const { comment_id, name, comment, password, new_password } = req.body;
    if(!comment_id || !password || !name || !comment || !new_password) {
        res.status(sc.BAD_REQUEST,au.successFalse(rm.NULL_VALUE));
        return;
    }
    Comment.update(comment_id, name, password, comment, new_password)
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err=>{
        res.status(sc.INTERNAL_SERVER_ERROR, au.successFalse(rm.INTERNAL_SERVER_ERROR));
    })
});

router.delete('/', (req, res)=> {
    const { comment_id, password } = req.body; 
    if(!comment_id || !password) {
        res.status(sc.BAD_REQUEST,
            au.successFalse(rm.NULL_VALUE));
        return;
    }
    Comment.delete(comment_id, password)
    .then(({code, json})=>{
        res.status(code).send(json);
    })
    .catch(err=>{
        res.status(sc.INTERNAL_SERVER_ERROR, au.successFalse(rm.INTERNAL_SERVER_ERROR));
    });
});

module.exports = router;