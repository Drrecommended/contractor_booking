const mysql = require('mysql2')
const config = require('config')
require('dotenv').config()

const connObj = {
  connectionLimit: 10,
  host: config.get('db.host'),
  user: config.get('db.user'),
  password: config.get('db.password'),
  database: config.get('db.database')
}
const connection = process.env.NODE_ENV === 'production' ? process.env.JAWSDB_URL : connObj
const pool = mysql.createPool(connection)
module.exports = pool
