


class DatabaseError extends Error {
    constructor(code='GENERIC', status = "서버 에러가 발생했습니다.", ...params) {
        super(...params);
        if(Error.captureStackTrace){
            Error.captureStackTrace(this, DatabaseError);
        }
        this.code = code;
        this.status = status;
        this.message = "DB 에러가 발생했습니다."
    }
}

module.exports = DatabaseError;