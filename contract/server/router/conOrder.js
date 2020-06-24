const express = require('express')
const router = express.Router()
const conn = require('../db.js')


router.get('/contractor-order', (req, res, next) => {
  console.log(req.query)
  res.json( 
      {
        orderData: [{
            orderNumber: "3298472348032",
            orderName: "Bill Murray",
            orderDate: "2/22/22",
            orderServices: "Moved Furniture",
            orderTotal: "$120.00"
          }],
        }
 
  )
})
  
  module.exports = router