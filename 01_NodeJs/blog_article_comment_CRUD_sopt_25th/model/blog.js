const au = require('../module/authUtil');
const sc = require('../module/statusCode');
const rm = require('../module/responseMessage');
const pool = require('../module/pool');

// 블로그이름, 설명, 만든 날짜, 주인이름, 비번

const blogs = {
    create: (username, blogname, describe, password) => {
        return new Promise( async (resolve, reject) => {
            const table = 'blog';
            const field = '`username`, `blogname`, `describe`, `password`';
            const info = `"${username}", "${blogname}", "${describe}", "${password}"`;
            const result = await pool.queryParam_None(`INSERT INTO ${table}(${field}) VALUES(${info})`)
            if(!result){
                resolve({
                    code: sc.BAD_REQUEST,
                    json: au.successFalse(rm.BLOG_CREATE_FAIL)
                });
                return;
            }
            resolve({
                code: sc.OK,
                json: au.successTrue(rm.BLOG_CREATE_SUCCESS, result)
            });
            return;
        });
    },
    read: () => {
        return new Promise( async (resolve, reject) => {
            const table = 'blog';
            const result = await pool.queryParam_None(`SELECT * FROM ${table}`)
            if (!result) {
                resolve({
                    code: sc.BAD_REQUEST,
                    json: au.successFalse(rm.BLOG_READ_ALL_FAIL)
                });
                return;
            }  
            resolve({
                code: sc.OK,
                json: au.successTrue(rm.BLOG_READ_ALL_SUCCESS, result)
            });
            return; 
        });
    },
    update: (blog_id, username, blogname, describe, password, new_password) => {
        return new Promise( async (resolve, reject) => {

            const table = 'blog';
            const blog_match_result = await pool.queryParam_None(`SELECT password FROM ${table} where blog_id = "${blog_id}"`);

            if (!blog_match_result) {
                resolve({
                    code: sc.BAD_REQUEST,
                    json: au.successFalse(rm.BLOG_UPDATE_FAIL)
                });
                return;
            }  
            console.log(blog_match_result)
            if(blog_match_result[0].password !== password) {
                resolve({
                    code: sc.FORBIDDEN,
                    json: au.successFalse(rm.MISS_MATCH_PW)
                });
                return;
            }
            const result = await pool.queryParam_None(`UPDATE ${table} SET username = "${username}", blogname = "${blogname}", \`describe\` = "${describe}", password = "${new_password}" WHERE blog_id = "${blog_id}"`);
            if (!result) {
                resolve({
                    code: sc.BAD_REQUEST,
                    json: au.successFalse(rm.BLOG_UPDATE_FAIL)
                });
                return;
            }  
            resolve({
                code: sc.OK,
                json: au.successTrue(rm.BLOG_UPDATE_SUCCESS, result)
            });
            return;
        });
    },
    delete: (blog_id, password) => {
        return new Promise( async (resolve, reject) => {

            const table = 'blog';
            const blog_match_result = await pool.queryParam_None(`SELECT * FROM ${table} where blog_id = "${blog_id}"`);

            if (!blog_match_result) {
                resolve({
                    code: sc.BAD_REQUEST,
                    json: au.successFalse(rm.BLOG_DELETE_FAIL)
                });
                return;
            }  
            console.log(blog_match_result)
            if(blog_match_result[0].password !== password) {
                resolve({
                    code: sc.FORBIDDEN,
                    json: au.successFalse(rm.MISS_MATCH_PW)
                });
                return;
            }
            const result = await pool.queryParam_None(`DELETE FROM ${table} WHERE blog_id = "${blog_id}"`);
            if (!result) {
                resolve({
                    code: sc.BAD_REQUEST,
                    json: au.successFalse(rm.BLOG_DELETE_FAIL)
                });
                return;
            }  
            resolve({
                code: sc.OK,
                json: au.successTrue(rm.BLOG_DELETE_SUCCESS, result)
            });
            return;
        });
    },
}

module.exports = blogs;