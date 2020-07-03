const express = require('express')
const router = express.Router()
const sha512 = require('js-sha512')
const jwt = require('jsonwebtoken')
const config = require('config')
const conn = require('../db.js')
const { createHash } = require('../utils')

router.post('/registration', (req, res, next) => {
    const { username, password } = req.body
    const salt = createHash(20)
    const hashedPassword = sha512(password + salt)
    const checkIfUserExistsSql = `SELECT * FROM users WHERE username = ?;`
    conn.query(checkIfUserExistsSql, [username], (err, results, fields) => {
        if (results.length) {
            res.status(400).json({ message: 'username already exists' })
        } else {
            const addUserSql = `
                INSERT INTO users (username, password, salt, contractor, profile_id)
                VALUES (?, ?, ?, ?, ?);
            `
            // TODO: needs to actually create a profile and accept contractor boolean
            conn.query(addUserSql, [username, hashedPassword, salt, true, 1], (err, results, fields) => {
                res.status(201).json({ message: 'user successfully created' })
            })
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
                const token = jwt.sign({ id: user.id, username: user.username, profile_id: 1 }, config.get('secret'))
                res.status(200).json({ token: token })
            } else {
                res.status(400).json({ message: 'invalid username or password' })
            }
        }
    })
})
module.exports = router