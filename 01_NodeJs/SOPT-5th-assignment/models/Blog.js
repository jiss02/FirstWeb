const pool = require('../modules/util/pool');
const sc = require('../modules/util/statusCode');
const rm = require('../modules/util/responseMessage');
const util = require('../modules/util/util');
const encrypt = require('../modules/util/encryption');

const table = 'blog';

module.exports = {
    read: () => {
        const q = `SELECT * FROM blog`;
        const result = pool.queryParam_None(q);
        
    },

    myblog: (userIdx) => {

    },
    create: ({userIdx ,title, content, created}) => {

    },
    update: ({blogIdx, title, content, created}) => {

    },
    delete: ({blogIdx}) => {

    },
}