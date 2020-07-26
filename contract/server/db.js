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
// TODO: NOT WORKING IN PROD needs to be fixed....
const connection = process.env.NODE_ENV === 'development' ? connObj : process.env.JAWSDB_URL
const pool = mysql.createPool(process.env.JAWSDB_URL)
module.exports = pool
