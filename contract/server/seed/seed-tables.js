const conn = require('../db.js')
const { createHash } = require('../utils')
const sha512 = require('js-sha512')
const query = require('./query')

// create a new user with hashed password
class User {
  constructor(username, password, first, last, email, contractor) {
    this.username = username
    this.salt = createHash(20)
    this.password = sha512(password + this.salt)
    this.first = first
    this.last = last
    this.contractor = contractor
    this.email = email
  }
}

const users = [
  new User('user', 'user', 'user', 'one', 'user@example.com', false),
  new User('contractor', 'contractor', 'contractor', 'one', 'contractor@example.com', true)
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
    `INSERT INTO addresses (city, street, state, zip) VALUES (?,?,?,?)
    `,
    ['las vegas', '555 apple st', 'AZ', '89101'],
    (result => {
      addressId = result.insertId
    })
  )

  await query(
    `INSERT INTO profiles (address_id, bio, thumbnail, trade_1, trade_2) VALUES(?, ?, ?, ?, ?)
    `,
    [addressId, 'I am a bio', 'https://placehold.it/250x250/8B63A1', 'plumber', 'electrician'],
    (result => {
      user.profile_id = result.insertId
    })
  )

  await query(
    `INSERT INTO users
    (username, password, salt, first_name, last_name, email, contractor, profile_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      user.username,
      user.password,
      user.salt,
      user.first,
      user.last,
      user.email,
      user.contractor,
      user.profile_id
    ],
  )
});

// user w/ id 1: user
// user w/ id: 2: contractor
(async () => {
  [makeService(), makeService()].map(async service => {
    await query(
      `
      INSERT INTO services (user_id, description, price)
      VALUES (?,?,?)
      `,
      [2, service.description, service.price]
    )
  })


  await query(`
    INSERT INTO galleries (profile_id, img_src)
    VALUES 
    (2, 'https://placehold.it/250x250/1D3030'),
    (2, 'https://placehold.it/250x250/007B7B'),
    (2, 'https://placehold.it/250x250/8B63A1')
  `)

  await query(`
      INSERT INTO orders (customer_id, contractor_id, date, services, total, status)
      VALUES 
      (1, 2, '2020-06-10', 'testing', 22.22, 'approved'),
      (1, 2, '2020-06-7', 'testing', 42.22, 'denied'),
      (1, 2, '2020-06-7', 'testing', 52.22, 'pending')
  `)
})()