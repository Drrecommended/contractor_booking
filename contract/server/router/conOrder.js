const express = require('express')
const router = express.Router()
const conn = require('../db.js')


router.get('/contractor-order', (req, res, next) => {
  console.log(req.user)
  const sql = `
      SELECT 
      o.status, o.id, o.services, o.date, o.total, u.first_name, u.last_name
      FROM orders o 
      JOIN users u ON customer_id = u.id
      WHERE contractor_id = ?
    `
  conn.query(
    sql,
    [req.user.id],
    (err, results, fields) => {
      console.log(results)
      res.json(results)
    }
  )
})

router.patch('/contractor-order', (req, res, next) => {
  const sql = `
    UPDATE orders o 
    SET status = ? 
    WHERE id = ?;
    `
  console.log(req.body)
  conn.query(
    sql,
    [req.body.status, req.body.id],
    (err, results, fields) => {
      console.log(err)
      res.json(results)
    })
})

module.exports = router