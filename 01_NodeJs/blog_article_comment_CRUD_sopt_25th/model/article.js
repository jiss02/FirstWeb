const au = require('../module/authUtil');
const sc = require('../module/statusCode');
const rm = require('../module/responseMessage');
const pool = require('../module/pool');

const article = {
    create:(blog_id, title, content)=>{
        return new Promise( async (resolve, reject)=>{
            const table = 'board';
            const field = '`blog_id`,`title`, `content`, `created`';
            const time = new Date().toISOString().slice(0,10);
            const info = `${blog_id},"${title}", "${content}", "${time}"`;
            const result = await pool.queryParam_None(`INSERT INTO ${table}(${field}) VALUES(${info})`);
            if(!result){
                resolve({
                    code: sc.BAD_REQUEST,
                    json: au.successFalse(rm.BOARD_CREATE_FAIL)
                });
            return;
            }
            resolve({
                code: sc.OK,
                json: au.successTrue(rm.BOARD_CREATE_SUCCESS, result)
            });
            return;
        });
    },
    read:(blog_id)=>{
        return new Promise( async (resolve, reject)=>{
            const table = 'board';
            const result = await pool.queryParam_None(`SELECT * FROM ${table} WHERE blog_id = ${blog_id}`);
            if (!result) {
                resolve({
                    code: sc.BAD_REQUEST,
                    json: au.successFalse(rm.BOARD_READ_ALL_FAIL)
                });
                return;
            }
            resolve({
                code: sc.OK,
                json: au.successTrue(rm.BOARD_READ_ALL_SUCCESS, result)
            });
            return;
        });
    },
    update:(board_id, title, content, blog_password)=>{
        return new Promise( async (resolve, reject)=>{
            const table1 = 'board';
            const table2 = 'blog';
            const board_match_table = await pool.queryParam_None(`SELECT password FROM ${table1} AS bo, ${table2} AS bl WHERE bo.blog_id = bl.blog_id AND bo.board_id = ${board_id}`);
            if(!board_match_table) {
                resolve({
                    code: sc.BAD_REQUEST,
                    json: au.successFalse(rm.BOARD_UPDATE_FAIL),
                });
                return;
            }
            if (board_match_table[0].password !== blog_password) {
                resolve({
                    code: sc.FORBIDDEN,
                    json: au.successFalse(rm.MISS_MATCH_PW)
                });
                return;
            }
            const result = await pool.queryParam_None(`UPDATE ${table1} SET title = "${title}", content = "${content}" WHERE board_id = "${board_id}"`);
            if (!result) {
                resolve({
                    code: sc.BAD_REQUEST,
                    json: au.successFalse(rm.BOARD_UPDATE_FAIL)
                });
                return;
            }  
            resolve({
                code: sc.OK,
                json: au.successTrue(rm.BOARD_UPDATE_SUCCESS, result)
            });
            return;
        });
    },
    delete:(blog_id,board_id, blog_password)=>{
        return new Promise( async (resolve, reject)=>{
            const table = 'board';
            const blog = 'blog';
            const board_match_result = await pool.queryParam_None(`SELECT password FROM ${table} AS bo, ${blog} AS bl where bo.blog_id = bl.blog_id AND bo.board_id = "${board_id}"`);
            if(!board_match_result) {
                resolve ({
                    code: sc.BAD_REQUEST,
                    json: au.successFalse(rm.BOARD_DELETE_FAIL)
                });
                return;
            }
            if(board_match_result[0].password !== blog_password) {
                resolve({
                    code: sc.FORBIDDEN,
                    json: au.successFalse(rm.MISS_MATCH_PW)
                });
                return;
            }
            const result = await pool.queryParam_None(`DELETE FROM ${table} WHERE board_id = "${board_id}"`);
            if(!result){
                resolve({
                    code: sc.BAD_REQUEST,
                    json: au.successFalse(rm.BOARD_DELETE_FAIL)
                });
                return;
            }
            resolve({
                code: sc.OK,
                json: au.successTrue(rm.BOARD_DELETE_SUCCESS, result)
            });
            return;
        });
    },
}

module.exports = article;