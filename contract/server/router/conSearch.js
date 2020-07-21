const express = require('express')
const router = express.Router()
const conn = require('../db.js')


router.get('/contractor-search', (req, res, next) => {
  // TODO: quotes with percentage and ? in backtick string not working...
  const fuzzySearchTerm = "%" + req.query.word + "%"
  const sql = `
    SELECT p.bio, p.thumbnail, u.profile_id, u.first_name, u.last_name, u.id, s.description
    FROM contractor_app.services s
    INNER JOIN users u ON s.user_id = u.id
    INNER JOIN profiles p ON p.id = u.profile_id
    WHERE s.description LIKE ?
    `
  conn.query(
    sql,
    [fuzzySearchTerm],
    (err, results, fields) => {
      console.log(req.query.word)
      res.json(results)
    })
})



module.exports = router
