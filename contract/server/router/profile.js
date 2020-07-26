const express = require('express')
const router = express.Router()
const conn = require('../db.js')
const { formatDate, addDaysToDate } = require('../utils')
const { useContractor } = require('../../client/src/hooks/index.js')

// conn.query(sql , [], (err, results, fields) => {})
router.get('/profile', async (req, res, next) => {
  const profileId = req.user.profile_id
  const userId = req.user.id
  const sql = `SELECT * FROM profiles
                INNER JOIN addresses ON profiles.address_id = addresses.id
                WHERE profiles.id = ?`
  const sql2 = `SELECT * FROM galleries WHERE profile_id = ?`
  const sql3 = `SELECT * FROM services WHERE user_id = ?;`
  const userSql = `SELECT * FROM users WHERE id = ?`
  const [addressProfile] = await conn.promise().query(sql, [profileId])
  const [galleriesProfile] = await conn.promise().query(sql2, [profileId])
  const [servicesProfile] = await conn.promise().query(sql3, [userId])
  const [userInfo] = await conn.promise().query(userSql, [userId])
  const user = userInfo[0]
  const profile = {
    address: addressProfile[0],
    gallery: galleriesProfile,
    services: servicesProfile.map(item => ({ ...item, key: item.id, text: item.description + " $" + item.price, value: item.id })),
    user: {
      id: user.id,
      first: user.first_name,
      last: user.last_name,
<<<<<<< HEAD
      contractor: user.contractor
=======
>>>>>>> d330904a5846cb006a80c6eef7225025ffaf8589
    }
  }
  res.json(profile)
})

router.get('/profile/:id', async (req, res, next) => {
  const profileId = req.params.id
  const sql = `SELECT * FROM profiles
                INNER JOIN addresses ON profiles.address_id = addresses.id
                WHERE profiles.id = ?`
  const sql2 = `SELECT * FROM galleries WHERE profile_id = ?`
  const sql3 = `SELECT * FROM services WHERE user_id = ?;`
  const userSql = `SELECT * FROM users WHERE profile_id = ?`
  const [addressProfile] = await conn.promise().query(sql, [profileId])
  const [galleriesProfile] = await conn.promise().query(sql2, [profileId])
  const [userInfo] = await conn.promise().query(userSql, [profileId])
  const user = userInfo[0]
  const [servicesProfile] = await conn.promise().query(sql3, [user.id])
  const profile = {
    address: addressProfile[0],
    gallery: galleriesProfile,
    services: servicesProfile.map(item => ({ ...item, key: item.id, text: item.description + " $" + item.price, value: item.id })),
    user: {
      id: user.id,
      first: user.first_name,
      last: user.last_name,
<<<<<<< HEAD
      contractor: user.contractor
=======
>>>>>>> d330904a5846cb006a80c6eef7225025ffaf8589
    }
  }
  res.json(profile)
})

router.get('/available/:profile_id', async (req, res, next) => {
  // generate a date range starting today and going to 30 days from today
  const today = new Date()
  const todayFormatted = formatDate(today)
  const thirtyDaysFromToday = formatDate(addDaysToDate(today, 30))
  const selectUnion = '(SELECT 0 i union SELECT 1 union SELECT 2 union SELECT 3 union SELECT 4 union SELECT 5 union SELECT 6 union SELECT 7 union SELECT 8 union SELECT 9)'
  const dateRange = `
  SELECT selected_date, o.id FROM (
    SELECT * FROM
      (SELECT 
        adddate('1970-01-01',t4.i*10000 + t3.i*1000 + t2.i*100 + t1.i*10 + t0.i) selected_date FROM
        ${selectUnion} t0,
        ${selectUnion} t1,
        ${selectUnion} t2,
        ${selectUnion} t3,
        ${selectUnion} t4
      ) v
    WHERE selected_date BETWEEN '${todayFormatted}' AND '${thirtyDaysFromToday}'
  ) dates
  LEFT JOIN orders o
  ON dates.selected_date = o.date
  WHERE o.contractor_id IS NULL OR o.contractor_id = ?;
  `
  const [user] = await conn.promise().query(`SELECT * FROM users WHERE profile_id = ?`, [req.params.profile_id])
  const userId = user[0].id
  const [results] = await conn.promise().query(`${dateRange}`, [userId])
  res.json(results.map(item => ({date: item.selected_date, available: !!item.id})))
})


module.exports = router