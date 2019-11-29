module.exports = {
    isnull : (params) => Object.entries(params)
    .filter(it => it[1] == undefined).map(it => it[0]).join(',')
}