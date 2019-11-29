const pool = require('../modules/util/pool');
const sc = require('../modules/util/statusCode');
const rm = require('../modules/util/responseMessage');
const util = require('../modules/util/util');
const encrypt = require('../modules/util/encryption');
const Auth = require('../modules/jwt');

const table = 'user';

module.exports = {
    register: ({id, password, salt,username, email}) => {
        const field = 'id, password, salt, username, email';
        const questions = `?,?,?,?,?`;
        const values = [id, password, salt,username, email];
        const q = `INSERT INTO ${table}(${field}) VALUES(${questions})`;

        const sendData = pool.queryParam_Parse(q, values)
        .then(result => {
            return {
                code : sc.CREATED,
                json: util.successTrue(rm.SIGN_UP_SUCCESS, sc.CREATED, result)
            }
        })
        .catch(err => {
            if(err.errno == 1062) {
                return {
                    code: sc.BAD_REQUEST,
                    json: util.successFalse("존재하는 아이디 및 닉네임입니다", sc.BAD_REQUEST)
                };
            }
            throw err;
        });
        return sendData;
    },
    login: ({id, password}) => {
        const q = `SELECT * FROM user WHERE id='${id}'`;
        const sendData = pool.queryParam_None(q)
        .then(async (result) => {
            if(result.length == 0){
                return {
                    code: sc.BAD_REQUEST,
                    json: util.successFalse(rm.NO_USER, sc.BAD_REQUEST)
                };
            }
            console.log(result);
            const user = result[0];
            const {hashed} = await encrypt.encryptWithSalt(password, user.salt);
            if (user.password != hashed){
                return {
                    code: sc.BAD_REQUEST,
                    json: util.successTrue(rm.MISS_MATCH_PW, sc.BAD_REQUEST)
                };
            }
            const token = Auth.getToken(user);
            return {
                code: sc.OK,
                json: util.successTrue(rm.SIGN_IN_SUCCESS, sc.OK, token)
            };
        })
        .catch(err => {
            throw err;
        });
        return sendData;
    }
}