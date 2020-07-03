const express = require('express')
const router = express.Router()
const conn = require('../db.js')

// conn.query(sql , [], (err, results, fields) => {})
router.get('/edit', (req, res, next) => {
  res.send('Edit page!')
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
  res.json({ message: 'Byebye' })
})

router.patch('/profile/address', (req, res, next) => {
  console.log(req.body)
  const profileId = req.user.profile_id
  const sql = 'SELECT address_id FROM profiles WHERE id = ?'
  conn.query(
    sql,
    [profileId],
    (err, results, fields) =>{
      console.log(results[0].address_id)
      res.json({ data: 'address'})
      
    }
  )

 
})



module.exports = router