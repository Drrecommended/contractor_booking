const express = require('express')
const router = express.Router()
const conn = require('../db.js')


router.get('/contractor-search', (req, res, next) => {
  // TODO: quotes with percentage and ? in backtick string not working...
  const fuzzySearchTerm = "%" + req.query.word + "%"
  const sql = `
      SELECT s.user_id, u.first_name, u.last_name, u.profile_id, p.bio, p.thumbnail, p.trade_1, p.trade_2
      FROM contractor_app.services s
      INNER JOIN users u ON u.id = s.user_id
      INNER JOIN profiles p ON p.id = u.profile_id
      WHERE s.description LIKE ?
      GROUP BY s.user_id
    `
  conn.query(
    sql,
    [fuzzySearchTerm],
    (err, results, fields) => {
      res.json(results)
    })
})



module.exports = router

