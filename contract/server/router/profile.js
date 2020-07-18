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
  console.log(profile)
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


module.exports = router