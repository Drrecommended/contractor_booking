const express = require('express')
const router = express.Router()
const conn = require('../db.js')


router.get('/contractor-search', (req, res, next) => {
  console.log(req.query)
  res.json(
    [
      {
        thumbnail: "https://www.fillmurray.com/g/140/100",
        first: "Bill",
        last: "Murray",
        address: {
          street: "1111 street st",
          city: "las vegas",
          state: "NV"
        },
        trade: "Plumber"
      },
      {
        thumbnail: "https://www.fillmurray.com/g/140/100",
        first: "Bill",
        last: "Murray",
        address: {
          street: "1111 street st",
          city: "las vegas",
          state: "NV"
        },
        trade: "Plumber"
      },
      {
        thumbnail: "https://www.fillmurray.com/g/140/100",
        first: "Bill",
        last: "Murray",
        address: {
          street: "1111 street st",
          city: "las vegas",
          state: "NV"
        },
        trade: "Plumber"
      },
      {
        thumbnail: "https://www.fillmurray.com/g/140/100",
        first: "Bill",
        last: "Murray",
        address: {
          street: "1111 street st",
          city: "las vegas",
          state: "NV"
        },
        trade: "Plumber"
      }
    ]
  )
})
  
  module.exports = router