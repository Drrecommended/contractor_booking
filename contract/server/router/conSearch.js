const express = require('express')
const router = express.Router()
const conn = require('../db.js')


router.get('/contractor-search', (req, res, next) => {
  console.log(req.query)
  const sql = 
    'SELECT p.bio, u.first_name, u.last_name, s.description ' +
    'FROM contractor_app.services s ' + 
    'INNER JOIN users u ON s.user_id = u.id ' + 
    'INNER JOIN profiles p ON p.id = u.profile_id ' + 
    'WHERE description LIKE trim bushes;' 
    conn.query(
      sql, 
      [req.query.word],
      (err, results, fields) => {
        console.log(err)
        console.log(results)
        res.json(results)
      })
})


  
  module.exports = router
