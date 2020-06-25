const express = require('express')
const router = express.Router()
const conn = require('../db.js')

// conn.query(sql , [], (err, results, fields) => {})
router.get('/edit', (req, res, next) => {
  res.send('Edit page!')
})



module.exports = router