const express = require('express')
const router = express.Router()
const conn = require('../db.js')

// conn.query(sql , [], (err, results, fields) => {})
router.get('/profile/edit', async (req, res, next) => {
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
  res.json({
    address: addressProfile[0],
    gallery: galleriesProfile,
    services: servicesProfile,
    user: {
      id: user.id,
      first: user.first_name,
      last: user.last_name
    }
  })
})



router.post('/profile/gallery', (req, res, next) => {
  const profileId = req.user.profile_id
  const src = req.body.imgSrc
  const sql = `INSERT INTO galleries (profile_id, img_src) VALUES (?, ?)`
  conn.query(
    sql,
    [profileId, src],
    (err, results, fields) => {
      res.json({ data: 'created gallery item' })
    })
  // res.json({ message: 'success' })
})

router.delete('/profile/gallery/:id', (req, res, next) => {
  const galleryId = req.params.id
  const sql = `DELETE FROM galleries WHERE id = ?`
  conn.query(
    sql,
    [galleryId],
    (err, results, fields) => {
      res.json({ data: 'deleted gallery item' })
    })
})


router.post('/profile/service', (req, res, next) => {
  const userId = req.user.id
  const description = req.body.description
  const price = req.body.price
  const sql = `INSERT INTO services (user_id, description, price) VALUES (?, ?, ?)`
  conn.query(
    sql,
    [userId, description, price],
    (err, results, fields) => {
      res.json({ message: 'Hello' })
    })
})

router.delete('/profile/service/:id', (req, res, next) => {
  const serviceId = req.params.id
  const sql = `DELETE FROM services WHERE id = ?`
  conn.query(
    sql,
    [serviceId],
    (err, results, fields) => {
      res.json({ message: 'Byebye' })
    })
})

router.patch('/profile/service/:id', (req, res, next) => {
  const {description, price} = req.body
  const serviceId = req.params.id
  const sql = `UPDATE FROM services SET description = ?, price =? WHERE id = ?`
  conn.query(
    sql,
    [description, price, serviceId ],
    (err, results, fields) => {
      res.json({ message: 'update service buddy' })
    })
})




router.patch('/profile/address', async (req, res, next) => {
  const { city, state, street, zip, first, last, trade1, trade2, bio } = req.body

  const profileId = req.user.profile_id
  const sql = 'SELECT address_id FROM profiles WHERE id = ?'
  const [addressInfo] =  await conn.promise().query(sql, [profileId])
  const updateAddress = `
        UPDATE addresses  
        SET city = ?,
        state = ?,
        street = ?,
        zip = ?
        WHERE id = ?;`
        await conn.promise().query(updateAddress, [city, state, street,zip, addressInfo[0].address_id])
  const updateUser = 
        ` UPDATE users
          SET first_name = ?, last_name = ? WHERE id = ?;`
          await conn.promise().query(updateUser, [first, last, req.user.id])
  const updateProfile = ` UPDATE profiles SET trade_1 = ?, trade_2 = ?, bio = ? WHERE id = ?;`
        await conn.promise().query(updateProfile, [trade1, trade2, bio, profileId])
        res.json({ data: 'address updated' })
      
})



module.exports = router