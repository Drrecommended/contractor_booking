const query = require('./query');

(async () => {
  await query(`TRUNCATE TABLE users`)
  await query(`TRUNCATE TABLE profiles`)
  await query(`TRUNCATE TABLE addresses`)
  await query(`TRUNCATE TABLE galleries`)
  await query(`TRUNCATE TABLE services`)
  await query(`TRUNCATE TABLE orders`)
  await query(`TRUNCATE TABLE transactions`)
  process.exit()
})()