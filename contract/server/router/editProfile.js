const express = require('express')
const router = express.Router()
const conn = require('../db.js')

// conn.query(sql , [], (err, results, fields) => {})
router.get('/profile/edit', (req, res, next) => {
  const profileId = req.user.profile_id
  const galleryId = req.params.id
  const addressId = results[0].address_id
  const sql = `SELECT * FROM profiles
                INNER JOIN addresses ON profiles.address_id = addresses.id
                WHERE profiles.id=2`
  const sql2 = `SELECT * FROM galleries WHERE galleries.profile_id = 2`
  const sql3 = `SELECT * FROM services WHERE services.user_id = 2;`
  conn.query(
    sql,
    [profileId,addressId, galleryId ],
    (err, results,fields) => {
      console.log(results)
      res.json('Edit page!')
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
  console.log(req.body)
  const userId = req.user.id
  const description = req.body.description
  const price = req.body.price
  const sql = `INSERT INTO services (user_id, description, price) VALUES (?, ?, ?)`
    conn.query(
      sql,
      [userId, description, price],
      (err, results, fields) => {
        console.log(results)
        res.json({ message: 'Hello' })
      })
    })

router.delete('/profile/service/:id', (req, res, next) => {
      console.log(req.params.id)
      const serviceId= req.params.id
      const sql = `DELETE FROM services WHERE id = ?`
      conn.query(
        sql,
        [serviceId],
        (err,results,fields) => {
          console.log(results)
          res.json({ message: 'Byebye' })
        })
      })
        
    

  

router.patch('/profile/address', (req, res, next) => {
  console.log(req.body)
  const { city, state, street, zipcode } = req.body

  const profileId = req.user.profile_id
  const sql = 'SELECT address_id FROM profiles WHERE id = ?'
  conn.query(
    sql,
    [profileId],
    (err, results, fields) => {
      const addressId = results[0].address_id
      const updateAddress = `
        UPDATE addresses
        SET city = ?,
        state = ?,
        street = ?,
        zip = ?
        WHERE id = ?;
      `
      conn.query(updateAddress, [
        city,
        state,
        street,
        zipcode,
        addressId
      ], (err, results, fields) => {
        console.log(err)
        res.json({ data: 'address updated' })
      })

    }
  )


})



module.exports = router