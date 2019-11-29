const jwt = require('../jwt');
const rm = require('./responseMessage');
const sc = require('./statusCode');
const util = require('./util');

const authUtil = {
    LoggedIn: async(req, res, next) => {
        var token = req.headers.token;

        if(!token){
            res.status(sc.BAD_REQUEST)
            .sned(util.successFalse(rm.NULL_VALUE), sc.BAD_REQUEST)
        }
        const result = jwt.verify(token);
        console.log(result);
        if(result === -1){
            res.status(sc.UNAUTHORIZED)
            .send(util.successFalse(rm.INVALID_TOKEN, sc.UNAUTHORIZED));
        }
        if(result === -2){
            res.status(sc.BAD_REQUEST)
            .send(util.successFalse(rm.NULL_VALUE, sc.BAD_REQUEST));
        }

        const userId = result.id;
        if(!userId){
            res.status(sc.BAD_REQUEST)
            .send(util.successFalse(rm.NULL_VALUE, sc.BAD_REQUEST));
        }
        req.decoded = userId;
        next();
    },
}


module.exports = authUtil;