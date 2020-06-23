const conn = require('../db.js')
const { createHash } = require('../utils')
const sha512 = require('js-sha512')

class User {
  constructor(username, password, first, last, contractor) {
    this.username = username
    this.salt = createHash(20)
    this.password = sha512(password + this.salt)
    this.first = first
    this.last = last
    this.contractor = contractor
  }
}

const users = [
  new User('user', 'user', 'user', 'one', false),
  new User('contractor', 'contractor', 'contractor', 'one', true)
]

function query(sql, escaped, cb) {
  return new Promise((res, rej) => {
    conn.query(sql, escaped, (err, results, fields) => {
      if (err) {
        throw err
      }
      res(results)
      if (cb) {
        cb(results)
      }
    })
  })
}

// (async () => {
//   await query(`TRUNCATE TABLE users`)
//   await query(`TRUNCATE TABLE profiles`)
//   await query(`TRUNCATE TABLE addresses`)
// })()

users.map(async user => {
  let addressId
  await query(
    `INSERT INTO addresses (street) VALUES (NULL)
    `,
    null,
    (result => {
      addressId = result.insertId
    })
  )

  await query(
    `INSERT INTO profiles (address_id) VALUES(?)
    `,
    [addressId],
    (result => {
      user.profile_id = result.insertId
    })
  )

  await query(
    `INSERT INTO users
    (username, password, salt, first_name, last_name, contractor, profile_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      user.username,
      user.password,
      user.salt,
      user.first,
      user.last,
      user.contractor,
      user.profile_id
    ],
    (result => {
      const user = result

    })
  )
})