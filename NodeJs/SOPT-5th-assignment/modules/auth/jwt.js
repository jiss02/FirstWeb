const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
const {
    secretOrPrivateKey
} = require('../../config/key');
const options = {
    algorithm: "HS256",
    expiresIn: "24h",
    issuer: "genie"
};

module.exports = {
    getToken: (user) => {
        const payload = {
            idx: user.userIdx,
            id: user.id,
            username : user.username,
        };
        const result = {
            token: jwt.sign(payload, secretOrPrivateKey, options),
            refreshToken: randToken.uid(256)
        };
        console.log(result);
        return result;
    },
    verify: (token) => {
        let decoded;
        try {
            decoded = jwt.verify(token, secretOrPrivateKey);
        } catch (err) {
            if (err.message === 'jwt exrpired'){
                console.log('expried token');
                return -1;
            } else if (err.message === 'invalid token') {
                console.log('invalid token');
                return -2;
            } else {
                console.log('invalid token');
                return -2;
            }
        }
        return decoded;
     },
};