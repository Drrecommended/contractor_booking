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
    BIO: "About Me",
    options: [
      { key: 1, text: 'cutting bushes', price: 20, value: 1 },
      { key: 2, text: 'plumbing', price: 15, value: 2 },
      { key: 3, text: 'renovation', price: 20, value: 3 },
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