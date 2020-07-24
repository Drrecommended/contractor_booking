module.exports = {
    createHash(len) {
        let vals = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let str = ''
        for (let i = 0; i < len; i++) {
            const randomIndex = Math.floor(Math.random() * vals.length)
            str += vals.charAt(randomIndex)
        }
        return str
    },
    formatDate(date) {
        let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()
        month = month.length < 2 ? ('0' + month) : month
        day = day.length < 2 ? ('0' + day) : day
        return [year, month, day].join('-')
    },
    addDaysToDate(date, days) {
        return date.setDate(date.getDate() + days)
    }
}