var express = require('express');
var router = express.Router();
const util = require('../../modules/util/util');
const sc = require('../../modules/util/statusCode');
const rm = require('../../modules/util/responseMessage');
const encrypt = require('../../modules/util/encryption');
const check = require('../../modules/util/nullcheck');
var jwtr =  require('jwt-redis').default;
const User = require('../../models/User');

router.post('/register', (req, res)=>{
    const {id, password, username, email} = req.body;
    if(!id || !password || !username || !email){
        const miss = check.isnull({id, password, username, email});
        res.status(sc.BAD_REQUEST)
        .send(util.successFalse(`${rm.NULL_VALUE} 없는 값은 ${miss} 입니다`, sc.BAD_REQUEST));
    }
    encrypt.encrypt(password)
    .then(({hashed, salt}) => User.register({id, password:hashed, salt, username, email}))
    .then(({code, json}) => res.status(code).send(json))
    .catch(err => {
        console.log(err);
        res.status(sc.INTERNAL_SERVER_ERROR).
        send(util.successFalse(rm.INTERNAL_SERVER_ERROR, sc.INTERNAL_SERVER_ERROR))
    })
});

router.post('/login', (req, res)=>{
    const {id, password} = req.body;
    if(!id || !password){
        const miss = check.isnull({id, password});
        res.status(sc.BAD_REQUEST)
        .send(util.successFalse(`${rm.NULL_VALUE} 없는 값은 ${miss} 입니다`, sc.BAD_REQUEST));
    }
    User.login({id, password})
    .then(({code, json})=> res.status(code).send(json))
    .catch(err => {
        console.log(err)
        res.status(sc.INTERNAL_SERVER_ERROR)
        .send(util.successFalse(rm.INTERNAL_SERVER_ERROR));
    });
});

module.exports = router;