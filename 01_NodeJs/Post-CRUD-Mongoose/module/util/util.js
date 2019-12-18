
module.exports = {
    success: (msg, data) => {
        return {
            msg,
            data
        }
    },
    fail: (msg) => {
        return {
            msg
        }
    }
}