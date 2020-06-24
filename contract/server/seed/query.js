const conn = require('../db.js')

module.exports = function query(sql, escaped, cb) {
  return new Promise((res, rej) => {
    conn.query(sql, escaped, (err, results, fields) => {
      if (err) {
        throw err
      }
      if (cb) {
        cb(results)
      }
      res(results)
    })
  })
}