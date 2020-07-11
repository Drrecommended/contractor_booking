const express = require('express')
const router = express.Router()
const conn = require('../db.js')

// conn.query(sql , [], (err, results, fields) => {})
router.get('/profile', (req, res, next) => {
  res.json({
    thumbnail: "https://pbs.twimg.com/profile_images/1050414908762939393/UKzYsgQg_400x400.jpg",
    first: "Prison",
    last: "Mike",
    address: {
      street: "555 apple st",
      city: "las vegas",
      state: "NV"

    },
    trade: "Origami Paper Company",
    BIO: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    options: [
      { id: 1, key: 1, text: 'cutting bushes', price: 20, value: 1 },
      { id: 2, key: 2, text: 'plumbing', price: 15, value: 2 },
      { id: 3, key: 3, text: 'renovation', price: 20, value: 3 },
    ],

    images: [
      {
        id: 1,
        image: "http://placehold.it/1250x250",
      },
      {
        id: 2,
        image: "http://placehold.it/1250x250",
      },
      {
        id: 3,
        image: "http://placehold.it/1250x250",
      }
    ]

  })


})

module.exports = router