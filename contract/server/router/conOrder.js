const express = require('express')
const router = express.Router()
const conn = require('../db.js')


router.get('/contractor-order', (req, res, next) => {
  const contractor = req.user.contractor
  console.log(req.user)
  const sql = `
      SELECT 
      o.status, o.id, o.services, o.date, o.total, u.first_name, u.last_name, u.profile_id
      FROM orders o 
      JOIN users u ON ${contractor ? 'customer_id' : 'contractor_id'} = u.id
      WHERE ${contractor ? 'contractor_id' : 'customer_id'} = ?
    `
  console.log(sql)
  conn.query(
    sql,
    [req.user.id],
    (err, results, fields) => {
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
/*
{
[1]   contractor_id: 2,
[1]   date: '7/11/2020',
[1]   cart: [ { id: 1, key: 1, text: 'cutting bushes', price: 20, value: 1 } ]
[1] }
*/
router.post('/orders', (req, res, next) => {
  const status = "pending"
  const total = req.body.cart.reduce((a, b) => a + b.price, 0)
  const services = req.body.cart.map(item => item.text).toString()
  const customerId = req.user.id
  const contractor = req.body.contractor_id
  const date = req.body.date
  const sql = `
  INSERT INTO orders 
  (customer_id, contractor_id, services, date, total, status)
  VALUES (?, ?, ?, ?, ?, ?)
  `
  conn.query(
    sql,
    [customerId, contractor, services, date, total, status],
    (err, results, fields) => {
      console.log(err, results)
      res.json(results)
    })
})

module.exports = router
