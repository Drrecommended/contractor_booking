const express = require('express')
const router = express.Router()
const sha512 = require('js-sha512')
const jwt = require('jsonwebtoken')
const config = require('config')
const conn = require('../db.js')
const { createHash } = require('../utils')
const r = require('../')

router.post('/registration', (req, res, next) => {
    const { username, firstname, lastname, email, password, contractor } = req.body
    const salt = createHash(20)
    const hashedPassword = sha512(password + salt)
    const checkIfUserExistsSql = `SELECT * FROM users WHERE username = ?;`
    conn.query(checkIfUserExistsSql, [username], async (err, results, fields) => {
        if (results.length) {
            res.status(400).json({ message: 'username already exists' })
        } else {
            const addUserSql = `
                INSERT INTO users 
                (username, first_name, last_name, email, password, salt, contractor, profile_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            `
            const addressSql = `INSERT INTO addresses (street) VALUES (NULL)`
            const profileSql = `INSERT INTO profiles (address_id) VALUES (?)`
            const [results] = await conn.promise().query(addressSql)
            const addressId = results.insertId
            const [profile] = await conn.promise().query(profileSql, [addressId])
            const profileId = profile.insertId
            const userFields = [
                username,
                firstname,
                lastname,
                email,
                hashedPassword,
                salt,
                contractor,
                profileId
            ]
            await conn.promise().query(addUserSql, userFields)
            res.status(201).json({ message: 'user successfully created' })
        }
    })
})

router.post('/login', (req, res, next) => {
    const { username, password } = req.body
    conn.query(`SELECT * FROM users WHERE username = ?;`, [username], (err, results, fields) => {
        if (!results.length) {
            // if a username is not found send back error 
            res.status(400).json({ message: 'invalid username or password' })
        } else {
            const user = results[0]
            const hashedPassword = sha512(password + user.salt)
            if (hashedPassword === user.password) {
                // generate a token based on server secret for client to use to authenticate
                const token = jwt.sign({ id: user.id, username: user.username, profile_id: user.profile_id, contractor: user.contractor }, config.get('secret'))
                res.status(200).json({ token: token })
            } else {
                res.status(400).json({ message: 'invalid username or password' })
            }
        }
    })
})
module.exports = router