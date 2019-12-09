const pool = require('../modules/db/pool');
const sc = require('../modules/util/statusCode');
const rm = require('../modules/util/responseMessage');
const util = require('../modules/util/util');
const moment = require('moment');
const table = 'blog';

module.exports = {
    read: () => {
        const q = `SELECT * FROM ${table}`;
        const sendData = pool.queryParam_None(q)
        .then(result => {
            // 존재하는지 판단
            if(!result[0]){
                return {
                    code: sc.BAD_REQUEST,
                    json: util.successFalse(rm.EMPTY_BLOG, sc.BAD_REQUEST)
                }
            }
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

    readOne: (blogIdx) => {
        const q = `SELECT * FROM ${table} WHERE blogIdx = ${blogIdx}`;
        const sendData = pool.queryParam_None(q)
        .then(result => {
            // 존재하는지 판단
            if(!result[0]){
                return {
                    code: sc.BAD_REQUEST,
                    json: util.successFalse(rm.NO_BLOG, sc.BAD_REQUEST)
                }
            }
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

    create: ({userIdx , blogname, summary}) => {
        const fields = '`userIdx`, `blogname`, `summary`, `created`, `updated`'
        const questions = `?,?,?,?,?`;
        const created = moment().format('YYYY-MM-DD hh:mm:ss');
        const updated = moment().format('YYYY-MM-DD hh:mm:ss');
        const values = [userIdx, blogname, summary, created, updated];
        const q = `INSERT INTO ${table}(${fields}) VALUES (${questions})`;
        
        const sendData = pool.queryParam_Parse(q, values)
        .then(result=>{
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

    update: async ({userIdx, blogIdx, blogname, summary}) => {
        const checkquery = `SELECT userIdx FROM ${table} WHERE blogIdx = ${blogIdx}`
        const sendData = pool.queryParam_None(checkquery)
        .then(result => {
            // 존재하는지 판단
            if(!result[0]){
                return {
                    code: sc.BAD_REQUEST,
                    json: util.successFalse(rm.NO_BLOG, sc.BAD_REQUEST)
                }
            }
            // 작성자인지 판단
            if(result[0].userIdx !== userIdx) {
                return {
                    code: sc.BAD_REQUEST,
                    json: util.successFalse("생성자와 일치하지 않습니다.", sc.BAD_REQUEST)
                }
            }
            // 작성자와 일치하는 경우
            const updated = moment().format('YYYY-MM-DD hh:mm:ss');
            const q = `UPDATE \`${table}\` SET blogname='${blogname}', summary='${summary}', updated='${updated}' WHERE blogIdx=${blogIdx}`;
            const updateData = pool.queryParam_None(q)
            .then(result => {
                return {
                    code: sc.OK,
                    json: util.successTrue(rm.BLOG_UPDATE_SUCCESS, sc.OK, result)
                }
            })
            .catch(err=>{
                throw err;
            });
            return updateData;
        });
        return sendData;
    },

    delete: (userIdx, blogIdx) => {
        const checkquery = `SELECT userIdx FROM ${table} WHERE blogIdx = ${blogIdx}`
        const sendData = pool.queryParam_None(checkquery)
        .then(result => {
            // 존재하는지 판단
            if(!result[0]){
                return {
                    code: sc.BAD_REQUEST,
                    json: util.successFalse(rm.NO_BLOG, sc.BAD_REQUEST)
                }
            }
            // 작성자인지 판단
            if(result[0].userIdx !== userIdx) {
                return {
                    code: sc.BAD_REQUEST,
                    json: util.successFalse("생성자와 일치하지 않습니다.", sc.BAD_REQUEST)
                }
            }
            // 작성자와 일치하는 경우
            const q = `DELETE FROM ${table} WHERE blogIdx = ${blogIdx}`;
            const updateData = pool.queryParam_None(q)
            .then(result => {
                return {
                    code: sc.OK,
                    json: util.successTrue(rm.BLOG_DELETE_SUCCESS, sc.OK, result)
                }
            })
            .catch(err=>{
                throw err;
            });
            return updateData;
        });
        return sendData;
    },

}