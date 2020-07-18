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


// router.get('/profile', (req, res, next) => {
//   res.json({
//     thumbnail: "https://pbs.twimg.com/profile_images/1050414908762939393/UKzYsgQg_400x400.jpg",
//     first: "Prison",
//     last: "Mike",
//     address: {
//       street: "555 apple st",
//       city: "las vegas",
//       state: "NV"

//     },
//     trade: "Origami Paper Company",
//     BIO: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//     options: [
//       { id: 1, key: 1, text: 'cutting bushes', price: 20, value: 1 },
//       { id: 2, key: 2, text: 'plumbing', price: 15, value: 2 },
//       { id: 3, key: 3, text: 'renovation', price: 20, value: 3 },
//     ],

//     images: [
//       {
//         id: 1,
//         image: "http://placehold.it/1250x250",
//       },
//       {
//         id: 2,
//         image: "http://placehold.it/1250x250",
//       },
//       {
//         id: 3,
//         image: "http://placehold.it/1250x250",
//       }
//     ]

//   })


// })

module.exports = router