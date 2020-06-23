const conn = require('../db.js')
const { createHash } = require('../utils')
const sha512 = require('js-sha512')
const query = require('./query')

// create a new user with hashed password
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

// create a random service to be associated with a contractor
function makeService() {
  const services = ['clean pool', 'trim hedges', 'floor tiling', 'plumbing']
  const randomPrice = Math.floor(Math.random() * (1000 - 100) + 100) / 100;
  const randomIndex = Math.floor(Math.random() * services.length)
  return { description: services[randomIndex], price: randomPrice }
}

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
    (async result => {
      const id = result.insertId
      const service = makeService()
      await query(`
      INSERT INTO services (user_id, description, price)
      VALUES (?,?,?)
      `,
        [id, service.description, service.price]
      )
    })
  )

  await query(`
    INSERT INTO galleries (profile_id, img_src)
    VALUES 
    (1, 'https://placehold.it/250x250/1D3030'),
    (1, 'https://placehold.it/250x250/007B7B'),
    (1, 'https://placehold.it/250x250/8B63A1')
  `)

  process.exit()
})