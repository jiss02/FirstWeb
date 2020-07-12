
module.exports = {
    success: (msg, data) => {
        return {
            msg,
            data
        }
    },
    fail: (name, msg) => {
        return {
            name,
            msg
        }
    }
}