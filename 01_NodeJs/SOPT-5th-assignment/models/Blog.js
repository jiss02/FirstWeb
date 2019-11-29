const pool = require('../modules/util/pool');
const sc = require('../modules/util/statusCode');
const rm = require('../modules/util/responseMessage');
const util = require('../modules/util/util');
const encrypt = require('../modules/util/encryption');

const table = 'blog';

module.exports = {
    read: () => {
        const q = `SELECT * FROM blog`;
        const sendData = pool.queryParam_None(q)
        .then(result => {
            return {
                code: sc.OK,
                json: util.successTrue(rm.BLOG_READ_ALL_SUCCESS, sc.OK, result)
            }
        })
        .catch(err=>{
            throw err;
        });
        return sendData;
    },
    myblog: (userIdx) => {
        console.log(userIdx)
        const q = `SELECT * FROM blog WHERE userIdx = ${userIdx}`;
        const sendData = pool.queryParam_None(q)
        .then(result => {
            return {
                code: sc.OK,
                json: util.successTrue(rm.BLOG_READ_SUCCESS, sc.OK, result)
            }
        })
        .catch(err=>{
            throw err;
        });
        return sendData;
    },
    create: ({userIdx , blogname, describe}) => {
        console.log(userIdx);
        const fields = '`userIdx`, `blogname`, `describe`, `created`'
        const questions = `?,?,?,?`;
        const created = new Date().toLocaleString().slice(0,18);
        const values = [userIdx, blogname, describe, created];
        const q = `INSERT INTO ${table}(${fields}) VALUES (${questions})`;
        
        const sendData = pool.queryParam_Parse(q, values)
        .then(result=>{
            console.log(result);
            return {
                code: sc.CREATED,
                json: util.successTrue(rm.BLOG_CREATE_SUCCESS, sc.CREATED)
            }
        })
        .catch(err => {
            throw err;
        });
        return sendData;
    },
    update: ({blogIdx, title, content, created}) => {

    },
    delete: ({blogIdx}) => {

    },
}