const express = require('express')
const router = express.Router()
const conn = require('../db.js')

// conn.query(sql , [], (err, results, fields) => {})
router.get('/', (req, res, next) => {
  res.json({ user: { first: 'john', last: 'smith' } })
})



module.exports = router