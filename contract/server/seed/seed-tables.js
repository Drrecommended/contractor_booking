const conn = require('../db.js')
const { createHash, formatDate, addDaysToDate } = require('../utils')
const sha512 = require('js-sha512')
const query = require('./query')

// create a new user with hashed password
class User {
  constructor(username, password, first, last, email, contractor, avatar, id) {
    this.username = username
    this.salt = createHash(20)
    this.password = sha512(password + this.salt)
    this.first = first
    this.last = last
    this.contractor = contractor
    this.email = email
    this.avatar = avatar || 'https://placehold.it/250x250/8B63A1'
    this.id = id
  }
}

const users = [
  new User('user', 'user', 'user', 'one', 'user@example.com', false, 'https://randomuser.me/api/portraits/men/15.jpg', 1),
  new User('contractor', 'contractor', 'contractor', 'one', 'contractor@example.com', true, 'https://randomuser.me/api/portraits/men/95.jpg', 2),
  new User('contractor2', 'contractor2', 'contractor', 'two', 'contractor2@example.com', true, 'https://randomuser.me/api/portraits/men/94.jpg', 3)
]

// create a random service to be associated with a contractor
function makeService() {
  const services = ['clean pool', 'trim hedges', 'floor tiling', 'plumbing']
  const randomPrice = Math.floor(Math.random() * (1000 - 100) + 100) / 100;
  const randomIndex = Math.floor(Math.random() * services.length)
  return { description: services[randomIndex], price: randomPrice }
}

async function makeUser(user) {
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
    [addressId, 'I am a bio', user.avatar, (user.contractor && 'landscaper' || null), (user.contractor && 'plumber' || null)],
    (result => {
      user.profile_id = result.insertId
    })
  )

  await query(
    `INSERT INTO users
    (id, username, password, salt, first_name, last_name, email, contractor, profile_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      user.id,
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
}

makeUser(users[0]);
makeUser(users[1]);
makeUser(users[2]);

// user w/ id 1: user
// user w/ id: 2: contractor
(async () => {
  [{price: 100, description: 'plumbing'}, {price: 500, description: 'trim bushes'}].map(async service => {
    await query(
      `
      INSERT INTO services (user_id, description, price)
      VALUES (?,?,?)
      `,
      [2, service.description, service.price]
    )
  });

  [{price: 100, description: 'roofing'}, {price: 1000, description: 'tiling'}].map(async service => {
    await query(
      `
      INSERT INTO services (user_id, description, price)
      VALUES (?,?,?)
      `,
      [3, service.description, service.price]
    )
  });


  await query(`
    INSERT INTO galleries (profile_id, img_src)
    VALUES 
    (2, 'https://images.squarespace-cdn.com/content/v1/55c9505ae4b006a44568dcd5/1584571394917-K039OTK682IDD3B7QI8V/ke17ZwdGBToddI8pDm48kDogYgQdVQAkUW98gmY9Vgt7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0lCvyAd1-5UQFnp8aARaJsX8L94t2u-XxysXjqpmT3livZa5xrrf04fAJQc50Z6gVg/blob?format=1500w'),
    (2, 'https://images.squarespace-cdn.com/content/v1/55c9505ae4b006a44568dcd5/1584571394917-K039OTK682IDD3B7QI8V/ke17ZwdGBToddI8pDm48kDogYgQdVQAkUW98gmY9Vgt7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0lCvyAd1-5UQFnp8aARaJsX8L94t2u-XxysXjqpmT3livZa5xrrf04fAJQc50Z6gVg/blob?format=1500w'),
    (2, 'https://images.squarespace-cdn.com/content/v1/55c9505ae4b006a44568dcd5/1584571394917-K039OTK682IDD3B7QI8V/ke17ZwdGBToddI8pDm48kDogYgQdVQAkUW98gmY9Vgt7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0lCvyAd1-5UQFnp8aARaJsX8L94t2u-XxysXjqpmT3livZa5xrrf04fAJQc50Z6gVg/blob?format=1500w')
  `)
  await query(`
      INSERT INTO orders (customer_id, contractor_id, date, services, total, status)
      VALUES 
      (1, 2, '${formatDate(new Date())}', 'testing', 22.22, 'approved'),
      (1, 2, '${formatDate(new Date(), addDaysToDate(new Date(), 1))}', 'testing', 42.22, 'denied'),
      (1, 2, '2020-06-7', 'testing', 52.22, 'pending')
  `)
})()