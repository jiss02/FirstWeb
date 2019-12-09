const pool = require('../modules/db/pool');
const poolsync = require('../modules/db/poolSync');
const sc = require('../modules/util/statusCode');
const rm = require('../modules/util/responseMessage');
const util = require('../modules/util/util');
const moment = require('moment');

const table = 'board';

module.exports = {
    read: async (blogIdx) => {
        const q = `SELECT * FROM ${table} WHERE blogIdx = ${blogIdx}`;
        const sendData = pool.queryParam_None(q)
        .then(result => {
            // 존재하는지 판단
            if(!result[0]){
                return {
                    code: sc.BAD_REQUEST,
                    json: util.successFalse(rm.NO_BOARD, sc.BAD_REQUEST)
                }
            }
            return {
                code: sc.OK,
                json: util.successTrue(rm.BOARD_READ_ALL_SUCCESS, sc.OK, result)
            }
        })
        .catch(err=>{
            throw err;
        });
        return sendData;
    },

    readOne: (blogIdx, boardIdx) => {
        const q = `SELECT * FROM ${table} WHERE blogIdx = ${blogIdx} and boardIdx = ${boardIdx}`;
        const sendData = pool.queryParam_None(q)
        .then(result => {
            // 존재하는지 판단
            if(!result[0]){
                return {
                    code: sc.BAD_REQUEST,
                    json: util.successFalse(rm.NO_BOARD, sc.BAD_REQUEST)
                }
            }
            return {
                code: sc.OK,
                json: util.successTrue(rm.BOARD_READ_SUCCESS, sc.OK, result)
            }
        })
        .catch(err=>{
            throw err;
        });
        return sendData;
    },

    create: ({userIdx, blogIdx, title, content, imgs}) => {
        const fields = '`userIdx`, `blogIdx` ,`title`, `content`,`created`, `updated`';
        const questions = `?,?,?,?,?,?`;
        const created = moment().format('YYYY-MM-DD hh:mm:ss');
        const updated = moment().format('YYYY-MM-DD hh:mm:ss');
        const values = [userIdx, blogIdx, title, content, created, updated];
        const q = `INSERT INTO ${table}(${fields}) VALUES (${questions})`;
        
        console.log(imgs)
        const sendData = pool.queryParam_Parse(q, values)
        .then(result=>{
             // 이미지 저장
            if(imgs.length !== 0){
                for (var img in imgs) {
                    img = imgs[img]
                    const imgquery = `INSERT INTO image(boardIdx, name, path, size) VALUES(${result.insertId},'${img.originalname}', '${img.path}', ${img.size})`
                    const imgresult = poolsync.queryParam_Parse(imgquery)
                    
                }
            }
            return {
                code: sc.CREATED,
                json: util.successTrue(rm.BOARD_CREATE_SUCCESS, sc.CREATED)
            }
        })
        .catch(err => {
            if(err.errno === 1452){
                return {
                    code: sc.BAD_REQUEST,
                    json: util.successFalse(rm.NO_BLOG, sc.BAD_REQUEST)
                }
            }
            throw err;
        });
        return sendData;
    },

    update: async ({userIdx, blogIdx, boardIdx, title, content, imgs}) => {
        const checkquery = `SELECT userIdx FROM ${table} WHERE blogIdx = ${blogIdx} and boardIdx = ${boardIdx}`
        const sendData = pool.queryParam_None(checkquery)
        .then(result => {
            // 존재하는지 판단
            if(!result[0]){
                return {
                    code: sc.BAD_REQUEST,
                    json: util.successFalse(rm.NO_BOARD, sc.BAD_REQUEST)
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
            const q = `UPDATE \`${table}\` SET title='${title}', content='${content}', imgs = '${imgs}', updated='${updated}' WHERE boardIdx=${boardIdx}`;
            const updateData = pool.queryParam_None(q)
            .then(result => {
                return {
                    code: sc.OK,
                    json: util.successTrue(rm.BOARD_UPDATE_SUCCESS, sc.OK, result)
                }
            })
            .catch(err=>{
                if(err.errno === 1452){
                    return {
                        code: sc.BAD_REQUEST,
                        json: util.successFalse(rm.NO_BLOG, sc.BAD_REQUEST)
                    }
                }
                throw err;
            });
            return updateData;
        });
        return sendData;
    },

    delete: (userIdx, blogIdx, boardIdx) => {
        const checkquery = `SELECT userIdx FROM ${table} WHERE blogIdx = ${blogIdx} and boardIdx = ${boardIdx}`
        const sendData = pool.queryParam_None(checkquery)
        .then(result => {
            // 존재하는지 판단
            if(!result[0]){
                return {
                    code: sc.BAD_REQUEST,
                    json: util.successFalse(rm.NO_BOARD, sc.BAD_REQUEST)
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
            const q = `DELETE FROM ${table} WHERE boardIdx = ${boardIdx}`;
            const updateData = pool.queryParam_None(q)
            .then(result => {
                return {
                    code: sc.OK,
                    json: util.successTrue(rm.BOARD_DELETE_SUCCESS, sc.OK, result)
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