const express = require('express')
const router = express.Router()
const conn = require('../db.js')

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
  //console.log('Hi', addressProfile)
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
      last: user.last_name
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
  //console.log('Hi', addressProfile)
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
      last: user.last_name
    }
  }
  res.json(profile)
})

router.get('/available/:id', async (req, res, next) => {
  const sub = `
  select * from 
    (select adddate('1970-01-01',t4.i*10000 + t3.i*1000 + t2.i*100 + t1.i*10 + t0.i) selected_date from
     (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t0,
     (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t1,
     (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t2,
     (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t3,
     (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t4) v
    where selected_date between '2020-05-22' and '2020-06-23'
  `

  const [results] = await conn.promise().query(`
  SELECT FORMAT(date, 'YYYY-MM-DD') as date FROM orders
  WHERE date IN (${sub}) AND contractor_id = ?;
  `, [req.params.id])
  
  const dateCache = {}
  results.map(item => {
    console.log(item.date)
    dateCache[item.date] = true
  })

  const [range] = await conn.promise().query(sub)
  const available = range.map(item => {
    return {date: item.selected_date, available: !dateCache[item.selected_date]}
  })
  res.json(available)
})


module.exports = router