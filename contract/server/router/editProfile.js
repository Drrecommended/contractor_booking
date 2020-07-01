const express = require('express')
const router = express.Router()
const conn = require('../db.js')

// conn.query(sql , [], (err, results, fields) => {})
router.get('/edit', (req, res, next) => {
  res.send('Edit page!')
})

router.post('/profile/gallery', (req, res, next) => {
  console.log(req.body)
  res.json({ message: 'success' })
})

router.delete('/profile/gallery/:id', (req, res, next) => {
  console.log(req.params.id)
  res.json({ message: 'Byebye' })
})



module.exports = router