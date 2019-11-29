// authUtil.js
const authUtil = {
    successTrue: (message, code, data) => {
        return {
            success: true,
            code: code,
            message: message,
            data: data
        }
    },
    successFalse: (message, code) => {
        return {
            success: false,
            code: code,
            message: message
        }
    },
}
module.exports = authUtil