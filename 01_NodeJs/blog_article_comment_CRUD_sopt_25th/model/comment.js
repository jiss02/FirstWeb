const au = require('../module/authUtil');
const sc = require('../module/statusCode');
const rm = require('../module/responseMessage');
const pool = require('../module/pool');

const comment = {
    create: (board_id, name, password, comment)=>{
        return new Promise( async (resolve, reject)=>{
            const table = 'comment';
            const field = '`board_id`, `name`, `password`,`comment`, `created`';
            const time = new Date().toISOString().slice(0,10);
            const info = `${board_id}, "${name}", "${password}", "${comment}", "${time}"`;
            const result = await pool.queryParam_None(`INSERT INTO ${table}(${field}) VALUES(${info})`);
            if(!result){
                resolve({
                    code: sc.BAD_REQUEST,
                    json: au.successFalse(rm.COMMENT_CREATE_FAIL)
                });
            return;
            }
            resolve({
                code: sc.OK,
                json: au.successTrue(rm.COMMENT_CREATE_SUCCESS, result)
            });
            return;
        });
    },
    read: (board_id) => {
        return new Promise( async (resolve, reject)=>{
            const table = 'comment';
            const result = await pool.queryParam_None(`SELECT * FROM ${table} WHERE board_id = ${board_id}`);
            if(!result){
                resolve({
                    code: sc.BAD_REQUEST,
                    json: au.successFalse(rm.COMMENT_READ_ALL_FAIL)
                });
                return;
            }
            resolve({
                code: sc.OK,
                json: au.successTrue(rm.COMMENT_READ_SUCCESS, result)
            });
            return;
        });
    },
    update: (comment_id, name, password, comment, new_password) => {
        return new Promise( async (resolve, reject)=>{
            const comment_match_table = await pool.queryParam_None(`SELECT password FROM board AS bo, comment AS co WHERE co.board_id = bo.board_id AND co.comment_id = ${comment_id}`);
            if(!comment_match_table) {
                resolve({
                    code: sc.BAD_REQUEST,
                    json : au.successFalse(rm.COMMENT_UPDATE_FAIL)
                });
                return;
            }
            if (comment_match_table[0].password !== password) {
                resolve({
                    code: sc.FORBIDDEN,
                    json: au.successFalse(rm.MISS_MATCH_PW)
                });
                return;
            }
            const result = await pool.queryParam_None(`UPDATE comment SET name = "${name}", comment = "${comment}", password = "${new_password}" WHERE comment_id = "${comment_id}"`);
            if (!result) {
                resolve({
                    code: sc.BAD_REQUEST,
                    json: au.successFalse(rm.COMMENT_UPDATE_FAIL)
                });
                return;
            }  
            resolve({
                code: sc.OK,
                json: au.successTrue(rm.COMMENT_UPDATE_SUCCESS, result)
            });
            return;
        });
    },
    delete: (comment_id, password) => {
        return new Promise( async (resolve, reject)=>{
            const comment_match_result = await pool.queryParam_None(`SELECT password FROM comment WHERE comment_id = ${comment_id}`);
            if(!comment_match_result) {
                resolve ({
                    code: sc.BAD_REQUEST,
                    json: au.successFalse(rm.COMMENT_DELETE_FAIL)
                });
                return;
            }
            if(comment_match_result[0].password !== password) {
                resolve({
                    code: sc.FORBIDDEN,
                    json: au.successFalse(rm.MISS_MATCH_PW)
                });
                return;
            }
            const result = await pool.queryParam_None(`DELETE FROM comment WHERE comment_id = "${comment_id}"`);
            if(!result){
                resolve({
                    code: sc.BAD_REQUEST,
                    json: qu.successFalse(rm.COMMENT_DELETE_FAIL)
                });
                return;
            }
            resolve({
                code: sc.OK,
                json: au.successTrue(rm.COMMENT_DELETE_SUCCESS, result)
            });
            return;
        });
    },
}

module.exports = comment;