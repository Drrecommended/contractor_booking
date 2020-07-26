const express = require('express')
const router = express.Router()
const conn = require('../db.js')

// conn.query(sql , [], (err, results, fields) => {})
router.get('/dashboard', (req, res, next) => {
  res.status(200).json({ message: 'protected' })
})

module.exports = router