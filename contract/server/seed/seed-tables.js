const conn = require('../db.js')
const { createHash, formatDate, addDaysToDate } = require('../utils')
const sha512 = require('js-sha512')
const query = require('./query')

// create a new user with hashed password
class User {
  constructor(username, password, first, last, email, contractor, avatar, id, profileId) {
    this.username = username
    this.salt = createHash(20)
    this.password = sha512(password + this.salt)
    this.first = first
    this.last = last
    this.contractor = contractor
    this.email = email
    this.avatar = avatar || 'https://placehold.it/250x250/8B63A1'
    this.id = id
    this.profile_id = profileId
  }
}

const users = [
  new User('user', 'user', 'user', 'one', 'user@example.com', false, 'https://randomuser.me/api/portraits/men/15.jpg', 1, 1),
  new User('contractor', 'contractor', 'contractor', 'one', 'contractor@example.com', true, 'https://randomuser.me/api/portraits/men/95.jpg', 2, 2),
  new User('Jane', 'jane', 'jane', 'smith', 'jane@example.com', true, 'https://randomuser.me/api/portraits/women/1.jpg', 3, 3),
  new User('Aubrey', 'aubrey', 'aubrey', 'sykes', 'aubrey@example.com', true, 'https://randomuser.me/api/portraits/women/2.jpg', 4, 4)
]

const bio = [
  'I am a bio',
  'I\'ve been doing landscaping for as long as I can remember. Also if you are having issues with plumbing, I have a blue thumb.',
  'I always had an affinity for electronics and wiring. Also if you need car repair, please reach out.',
  'Hand me a circular saw and let me craft you a dog house!'
]

const trades = [
  null,
  ['landscaper', 'plumber'],
  ['electrician', 'mechanic'],
  ['carpenter', 'pipefitter']
]

// create a random service to be associated with a contractor
function makeService() {
  const services = ['clean pool', 'trim hedges', 'floor tiling', 'plumbing']
  const randomPrice = Math.floor(Math.random() * (1000 - 100) + 100) / 100;
  const randomIndex = Math.floor(Math.random() * services.length)
  return { description: services[randomIndex], price: randomPrice }
}

async function makeUser(user, index) {
  let addressId
  await query(
    `INSERT INTO addresses (city, street, state, zip) VALUES (?,?,?,?)
    `,
    ['las vegas', '555 apple st', 'NV', '89103'],
    (result => {
      addressId = result.insertId
    })
  )

  await query(
    `INSERT INTO profiles (address_id, bio, thumbnail, trade_1, trade_2, id) VALUES(?, ?, ?, ?, ?, ?)
    `,
    [addressId, bio[index], user.avatar, (user.contractor && trades[index] && trades[index][0] || null), (user.contractor && trades[index] && trades[index][1] || null), user.profile_id],
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

makeUser(users[0], 0);
makeUser(users[1], 1);
makeUser(users[2], 2);
makeUser(users[3], 3);

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

  [{price: 100, description: 'roofing'}, {price: 1000, description: 'tiling'}].map(async service => {
    await query(
      `
      INSERT INTO services (user_id, description, price)
      VALUES (?,?,?)
      `,
      [4, service.description, service.price]
    )
  });


  await query(`
    INSERT INTO galleries (profile_id, img_src)
    VALUES 
    (2, '//hgtvhome.sndimg.com/content/dam/images/hgtv/stock/2018/1/15/iStock-516844708_colorful-garden-path.jpg.rend.hgtvcom.616.462.suffix/1516141969592.jpeg'),
    (2, 'https://decortips.com/wp-content/uploads/2020/06/bushes-for-your-garden-e1593104926815.jpg'),
    (2, 'https://s3.amazonaws.com/greenpal-production/posts/header_images/000/000/044/original/Perfectly_mowed_grass.jpg?1570548578')
  `)
  await query(`
      INSERT INTO orders (customer_id, contractor_id, date, services, total, status)
      VALUES 
      (1, 2, '${formatDate(new Date())}', 'testing', 22.22, 'approved'),
      (1, 2, '${formatDate(new Date(), addDaysToDate(new Date(), 1))}', 'testing', 42.22, 'denied'),
      (1, 2, '2020-06-7', 'testing', 52.22, 'pending')
  `)
})()