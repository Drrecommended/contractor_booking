module.exports = {
    createHash(len) {
        let vals = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let str = ''
        for (let i = 0; i < len; i++) {
            const randomIndex = Math.floor(Math.random() * vals.length)
            str += vals.charAt(randomIndex)
        }
        return str
    }
}